"""SuperSearch API tests - health, contact CRUD"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


def test_health():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert "service" in data
    print("PASS: health check")


def test_contact_valid_submission():
    payload = {
        "name": "TEST_User",
        "company": "TEST_Co",
        "email": "test@example.com",
        "message": "Hello from automated test"
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "success"
    assert "id" in data
    assert "message" in data
    print(f"PASS: contact submission, id={data['id']}")
    return data["id"]


def test_contact_db_persistence():
    """Submit then verify it appears in GET /api/contact"""
    payload = {
        "name": "TEST_Persist",
        "company": "TEST_DBCo",
        "email": "persist@example.com",
        "message": "DB persistence test"
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200
    created_id = r.json()["id"]

    list_r = requests.get(f"{BASE_URL}/api/contact")
    assert list_r.status_code == 200
    items = list_r.json()
    ids = [item["id"] for item in items]
    assert created_id in ids
    # Ensure no _id field
    for item in items:
        assert "_id" not in item
    print("PASS: DB persistence and no _id in response")


def test_contact_invalid_email():
    payload = {
        "name": "Bad Email User",
        "company": "ACME",
        "email": "not-an-email",
        "message": "test"
    }
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422
    print("PASS: invalid email returns 422")


def test_contact_missing_fields():
    payload = {"name": "Only Name"}
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422
    print("PASS: missing fields returns 422")


def test_contact_list():
    r = requests.get(f"{BASE_URL}/api/contact")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    # Check sorted desc by created_at
    if len(items) >= 2:
        assert items[0]["created_at"] >= items[1]["created_at"]
    for item in items:
        assert "_id" not in item
    print(f"PASS: GET /api/contact, {len(items)} items")
