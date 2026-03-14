import sqlite3

# Connect to database
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Check current admin status
print("\n=== Current Users ===")
cursor.execute("SELECT id, name, email, role FROM users")
users = cursor.fetchall()
for user in users:
    print(f"ID: {user[0]}, Name: {user[1]}, Email: {user[2]}, Role: {user[3]}")

# Update admin role
print("\n=== Updating admin role ===")
cursor.execute("UPDATE users SET role='admin' WHERE email='admin@securevote.com'")
conn.commit()

# Verify it worked
print("\n=== After Update ===")
cursor.execute("SELECT id, name, email, role FROM users WHERE email='admin@securevote.com'")
admin = cursor.fetchone()
if admin:
    print(f"✅ ID: {admin[0]}, Name: {admin[1]}, Email: {admin[2]}, Role: {admin[3]}")
else:
    print("❌ Admin user not found!")

conn.close()
print("\n✅ Done!")
