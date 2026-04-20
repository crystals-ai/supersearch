from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import gspread
from google.oauth2.service_account import Credentials


ROOT_DIR = Path(__file__).parent
FRONTEND_DIR = ROOT_DIR.parent / "frontend" / "build"
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def get_sheet():
    creds_json = os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON')
    sheet_id = os.environ.get('GOOGLE_SHEET_ID')
    creds = Credentials.from_service_account_info(
        json.loads(creds_json),
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    gc = gspread.authorize(creds)
    return gc.open_by_key(sheet_id).sheet1


def append_to_sheet(payload) -> bool:
    try:
        sheet = get_sheet()
        sheet.append_row([
            datetime.now(timezone.utc).isoformat(),
            payload.name,
            payload.company,
            payload.email,
            payload.message,
        ])
        return True
    except Exception as e:
        logger.exception("Google Sheets append failed: %s", e)
        return False


app = FastAPI(title="SuperSearch API")
app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR / "static")), name="static")

api_router = APIRouter(prefix="/api")


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    company: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class ContactSubmissionResponse(BaseModel):
    id: str
    status: str
    message: str


@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def create_contact_submission(payload: ContactSubmissionCreate):
    submission = ContactSubmission(**payload.model_dump())
    ok = append_to_sheet(payload)
    if not ok:
        logger.warning("Failed to write contact submission to Google Sheet")

    return ContactSubmissionResponse(
        id=submission.id,
        status="success",
        message="Thanks — your message has been received. Our team will be in touch shortly.",
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Catch-all must be last so it doesn't shadow API routes
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(FRONTEND_DIR / "index.html")
