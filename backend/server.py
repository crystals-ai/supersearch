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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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


def send_contact_email(payload: ContactSubmissionCreate) -> bool:
    api_key = os.environ.get('SENDGRID_API_KEY')
    sender = os.environ.get('SENDER_EMAIL')
    destination = os.environ.get('CONTACT_DESTINATION_EMAIL')

    if not (api_key and sender and destination):
        logger.warning("SendGrid config missing; skipping email send")
        return False

    subject = f"[SuperSearch] New enquiry from {payload.company}"
    html_content = f"""
    <div style="font-family: Manrope, Arial, sans-serif; color: #111; max-width: 600px;">
      <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: 28px; margin: 0 0 16px;">New contact enquiry</h2>
      <p style="color:#6B6A68; margin: 0 0 24px;">A brand just reached out via the SuperSearch website.</p>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:8px 0; color:#6B6A68; width:140px;">Name</td><td style="padding:8px 0;">{payload.name}</td></tr>
        <tr><td style="padding:8px 0; color:#6B6A68;">Company</td><td style="padding:8px 0;">{payload.company}</td></tr>
        <tr><td style="padding:8px 0; color:#6B6A68;">Email</td><td style="padding:8px 0;"><a href="mailto:{payload.email}">{payload.email}</a></td></tr>
      </table>
      <div style="margin-top:24px; padding:16px; background:#F3F1ED; border:1px solid #E2DFD9;">
        <div style="color:#6B6A68; font-size:12px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom:8px;">Message</div>
        <div style="white-space: pre-wrap; line-height:1.6;">{payload.message}</div>
      </div>
    </div>
    """
    try:
        message = Mail(
            from_email=sender,
            to_emails=destination,
            subject=subject,
            html_content=html_content,
        )
        message.reply_to = payload.email
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        return 200 <= response.status_code < 300
    except Exception as exc:
        logger.exception("SendGrid send failed: %s", exc)
        return False


@api_router.get("/")
async def root():
    return {"service": "SuperSearch API", "status": "ok"}


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def create_contact_submission(payload: ContactSubmissionCreate):
    submission = ContactSubmission(**payload.model_dump())

    email_ok = send_contact_email(payload)
    submission.email_sent = email_ok

    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)

    return ContactSubmissionResponse(
        id=submission.id,
        status="success",
        message=(
            "Thanks — your message has been received. Our team will be in touch shortly."
            if email_ok else
            "Thanks — your message has been recorded. We will reach out shortly."
        ),
    )


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contact_submissions():
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
