import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_APP_PASSWORD = os.getenv("MAIL_APP_PASSWORD")
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "AI Student Performance Prediction")

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


def send_email(to_email: str, subject: str, html_body: str):
    """
    Sends an HTML email using Gmail SMTP.
    Call this inside a FastAPI BackgroundTask so it doesn't block the API response.
    """
    if not MAIL_USERNAME or not MAIL_APP_PASSWORD:
        print("Email not sent: MAIL_USERNAME or MAIL_APP_PASSWORD not set in .env")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{MAIL_FROM_NAME} <{MAIL_USERNAME}>"
    msg["To"] = to_email

    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(MAIL_USERNAME, MAIL_APP_PASSWORD)
            server.sendmail(MAIL_USERNAME, to_email, msg.as_string())
        print(f"Email sent to {to_email}: {subject}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")


def send_welcome_email(to_email: str, student_name: str):
    subject = "Welcome to AI Student Performance Prediction 🎓"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #6c5ce7;">Welcome, {student_name}! 🎓</h2>
        <p>Your registration on the <b>AI Student Performance Prediction System</b> was successful.</p>
        <p>You can now log in and get your academic performance predicted using our ML model.</p>
        <br>
        <p style="color: #888;">— AI Student Performance Prediction Team</p>
    </div>
    """
    send_email(to_email, subject, html_body)


def send_prediction_result_email(to_email: str, student_name: str, predicted_marks: float, is_low: bool):
    if is_low:
        subject = "⚠️ Performance Alert: Action Needed"
        alert_html = """
        <p style="color: #d63031; font-weight: bold;">
            Your predicted marks are below the passing threshold. Please consider increasing
            study hours and attendance to improve your performance.
        </p>
        """
    else:
        subject = "✅ Your Prediction Result is Ready"
        alert_html = """
        <p style="color: #00b894; font-weight: bold;">Great job! Keep up the good work.</p>
        """

    html_body = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #6c5ce7;">Prediction Result</h2>
        <p>Hi {student_name},</p>
        <p>Your predicted final marks: <b style="font-size: 20px;">{predicted_marks}</b></p>
        {alert_html}
        <br>
        <p style="color: #888;">— AI Student Performance Prediction Team</p>
    </div>
    """
    send_email(to_email, subject, html_body)


def send_password_reset_email(to_email: str, reset_link: str):
    subject = "Password Reset Request"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #6c5ce7;">Reset Your Password</h2>
        <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
        <p><a href="{reset_link}" style="background:#6c5ce7;color:white;padding:10px 20px;
            text-decoration:none;border-radius:6px;">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <br>
        <p style="color: #888;">— AI Student Performance Prediction Team</p>
    </div>
    """
    send_email(to_email, subject, html_body)