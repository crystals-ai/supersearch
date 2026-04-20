from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDGRID_SENDER = 'shaliniiitkgp2021@gmail.com'
MY_INBOX = 'supersearch00@gmail.com'

# Configure logging early so module-level functions can use `logger`
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI(title="SuperSearch API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    company: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class ContactSubmissionResponse(BaseModel):
    id: str
    status: str
    message: str

def send_email_via_sendgrid(sender, recipient, subject, body, reply_to=None):
    message = Mail(
        from_email=sender,
        to_emails=recipient,
        subject=subject,
        plain_text_content=body
    )
    
    if reply_to:
        message.reply_to = ReplyTo(reply_to)

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return response.status_code in [200, 201, 202]
    except Exception as e:
        print(f"SendGrid Error: {e}")
        return False

@api_router.get("/")
async def root():
    return {"service": "SuperSearch API", "status": "ok"}


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def create_contact_submission(payload: ContactSubmissionCreate):
    # 1. Create the database object logic
    submission = ContactSubmission(**payload.model_dump())

    full_message = (
        f"You have a new contact form submission:\n\n"
        f"Name: {payload.name}\n"
        f"User Email: {payload.email}\n\n"
        f"Message:\n{payload.message}"
    )

    # 4. Send the email to YOUR inbox
    # We pass payload.email as the reply_to so you can respond easily
    email_ok = send_email_via_sendgrid(
        sender=SENDGRID_SENDER,
        recipient=MY_INBOX,
        subject=f"New Website Message from {payload.name}",
        body=full_message,
        reply_to=payload.email 
    )

    submission.email_sent = email_ok
    # If using a DB, you would submission.save() here

    return ContactSubmissionResponse(
        id=submission.id,
        status="success",
        message=(
            "Thanks — your message has been received. Our team will be in touch shortly."
            if email_ok else
            "Thanks — your message has been recorded. We will reach out shortly."
        ),
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)