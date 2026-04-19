# SuperSearch — Product Requirements (PRD)

## Original Problem Statement
Company marketing website for **SuperSearch**, a startup that builds AI shopping assistants for retail companies across every industry (fashion, jewellery, bags, shoes, makeup, furniture, electronics, office supplies, etc.). The site highlights:
- 4 stats: 58% prefer AI assistants (up from 25% in 2023); 4× higher conversion for conversational vs keyword search (12.3% vs 3.1%, Rep AI); 35% of queries are full sentences, 7–8 word queries nearly doubled since ChatGPT (Search Engine Land); 82% want AI assistants to cut research time.
- Industry showcase with real example queries (fashion/jewellery, furniture, office supplies, beauty) — as interactive chat-style mockups with tabs.
- Offerings: AI Shopping Assistant, Catalog Enrichment, Intent-Aware Knowledge Graph.
- Founding team credentials (IIT / BITS / Meta / Microsoft / Uber / Visa / Cisco), most competitive pricing.
- Contact form to email `shaliniiitkgp2021@gmail.com`.

## User Choices (2025-12)
- Contact form → SendGrid email to `shaliniiitkgp2021@gmail.com` (sender verified) + MongoDB persistence.
- Design: Editorial/elegant, serif headings, airy layout.
- Industry examples: tabbed interface + chat-style animated mockups.
- Include founding team section and competitive-pricing highlight.

## Architecture
- **Frontend**: React 19 + CRA/Craco, Tailwind, shadcn/ui, framer-motion, sonner. Single-page landing with anchor sections.
- **Backend**: FastAPI + Motor (MongoDB) + SendGrid SDK. All routes under `/api`.
- **DB**: MongoDB collection `contact_submissions` (id, name, company, email, message, created_at, email_sent).

## Implemented (2025-12)
- Hero, Stats (×4), IndustryShowcase (4 tabs: fashion/furniture/office/beauty with animated chat mockup), Marquee, Offerings (×3), Team (7 logos), Contact form, Footer.
- Google Fonts: Cormorant Garamond (serif headings) + Manrope (body).
- `POST /api/contact`, `GET /api/contact`, `GET /api/` endpoints.
- SendGrid integration with graceful fallback (DB write on email failure).
- 100% pass on backend + frontend testing_agent_v4 iteration 1.

## Known Environmental Issues
- SendGrid free-tier account has **maximum credits exceeded** (HTTP 401). Email delivery is currently blocked on the provided API key; all submissions still persist to MongoDB. User needs to upgrade SendGrid plan or rotate key to restore email delivery.

## Backlog
- P1: Admin view for contact submissions.
- P2: Live assistant demo (call LLM on-page with user input).
- P2: Blog/insights section.
- P2: Case study / customer logos (real).
- P3: Pricing table with tiers.

## Credentials
- SendGrid sender: shaliniiitkgp2021@gmail.com (verified)
- Destination email: shaliniiitkgp2021@gmail.com
