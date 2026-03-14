import sqlite3, os, csv

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')
USERS_CSV = os.path.join(os.path.dirname(__file__), 'users.csv')

def get_conn():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = get_conn()
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        role TEXT DEFAULT 'voter'
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS elections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        candidates_json TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        paillier_public_key TEXT,
        results_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_time TEXT
    )''')
    
    # Migration: add end_time column if it doesn't exist
    try:
        c.execute("SELECT end_time FROM elections LIMIT 1")
    except sqlite3.OperationalError:
        print("Adding missing end_time column to elections table...")
        c.execute("ALTER TABLE elections ADD COLUMN end_time TEXT")
        conn.commit()
    
    c.execute('''CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        election_id INTEGER NOT NULL,
        voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, election_id)
    )''')
    
    conn.commit()
    conn.close()
    seed_users_from_csv()

def seed_users_from_csv():
    if not os.path.exists(USERS_CSV):
        return
    conn = get_conn()
    c = conn.cursor()
    with open(USERS_CSV, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = (row.get('name') or '').strip()
            email = (row.get('email') or '').strip().lower()
            role = (row.get('role') or 'voter').strip().lower()
            if not name or not email or '@' not in email:
                continue
            try:
                c.execute("INSERT OR IGNORE INTO users (name,email,role) VALUES (?,?,?)", (name, email, role))
            except Exception:
                pass
    conn.commit()
    conn.close()

def reload_users_from_csv():
    seed_users_from_csv()

def get_user(email):
    conn = get_conn()
    c = conn.cursor()
    c.execute("SELECT id,name,email,created_at,role FROM users WHERE email=?", (email,))
    row = c.fetchone()
    conn.close()
    return row

def create_user(name, email):
    conn = get_conn()
    c = conn.cursor()
    c.execute("INSERT INTO users (name,email) VALUES (?,?)", (name, email))
    conn.commit()
    conn.close()

def get_election(election_id):
    conn = get_conn()
    c = conn.cursor()
    c.execute("SELECT id,name,candidates_json,status,paillier_public_key,results_json,end_time FROM elections WHERE id=?", (election_id,))
    row = c.fetchone()
    conn.close()
    return row

def get_all_elections():
    conn = get_conn()
    c = conn.cursor()
    c.execute("SELECT id,name,candidates_json,status,paillier_public_key,results_json,end_time FROM elections ORDER BY id DESC")
    rows = c.fetchall()
    conn.close()
    return rows

def create_election(name, candidates_json, public_key_json, end_time=None):
    conn = get_conn()
    c = conn.cursor()
    c.execute("INSERT INTO elections (name,candidates_json,status,paillier_public_key,end_time) VALUES (?,?,?,?,?)",
              (name, candidates_json, 'active', public_key_json, end_time))
    conn.commit()
    eid = c.lastrowid
    conn.close()
    return eid

def update_election(election_id, status, results_json):
    conn = get_conn()
    c = conn.cursor()
    c.execute("UPDATE elections SET status=?, results_json=? WHERE id=?", (status, results_json, election_id))
    conn.commit()
    conn.close()

def has_voted(user_id, election_id):
    conn = get_conn()
    c = conn.cursor()
    c.execute("SELECT 1 FROM votes WHERE user_id=? AND election_id=?", (user_id, election_id))
    row = c.fetchone()
    conn.close()
    return row is not None

def mark_voted(user_id, election_id):
    conn = get_conn()
    c = conn.cursor()
    c.execute("INSERT OR IGNORE INTO votes (user_id, election_id) VALUES (?,?)", (user_id, election_id))
    conn.commit()
    conn.close()

def delete_election(election_id):
    """Delete an election and all associated votes"""
    conn = get_conn()
    c = conn.cursor()
    c.execute("DELETE FROM votes WHERE election_id=?", (election_id,))
    c.execute("DELETE FROM elections WHERE id=?", (election_id,))
    conn.commit()
    conn.close()
