import hashlib
import hmac
import time
import random
import string

SECRET_SALT = 'securevote-demo-salt-change-in-production'

def generate_otp(email):
    """Generate 6-digit OTP using HMAC-SHA256"""
    timestamp = str(int(time.time() / 300))  # 5-minute window
    message = f"{email}:{timestamp}"
    hmac_hash = hmac.new(SECRET_SALT.encode(), message.encode(), hashlib.sha256).hexdigest()
    
    # Extract 6 digits
    otp = str(int(hmac_hash[:8], 16))[-6:]
    return otp

def verify_otp(email, input_otp, expected_otp):
    """Verify OTP"""
    return input_otp == expected_otp

def send_otp(email, otp):
    """Send OTP via email/SMS (console simulation for demo)"""
    print(f"\n{'='*50}")
    print(f"📧 OTP for {email}: {otp}")
    print(f"{'='*50}\n")
    
    # In production: use smtplib or SMS gateway
    # Example SMTP code:
    # import smtplib
    # from email.mime.text import MIMEText
    # msg = MIMEText(f"Your SecureVote OTP: {otp}")
    # msg['Subject'] = 'SecureVote OTP'
    # msg['From'] = 'noreply@securevote.com'
    # msg['To'] = email
    # with smtplib.SMTP('smtp.gmail.com', 587) as server:
    #     server.starttls()
    #     server.login('your_email@gmail.com', 'password')
    #     server.send_message(msg)
