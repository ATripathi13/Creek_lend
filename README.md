<![CDATA[<div align="center">

# 🏦 Creek Lend

**A production-grade, full-stack direct lending platform.**

Built with Next.js 16 · Node.js + Express · PostgreSQL · Prisma 7 · AES-256 Encryption · Meta CAPI · GTM Server-Side

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture](#-architecture)
3. [Tech Stack](#-tech-stack)
4. [Monorepo Structure](#-monorepo-structure)
5. [Prerequisites](#-prerequisites)
6. [Quick Start](#-quick-start)
7. [Environment Variables](#-environment-variables)
8. [Backend API Reference](#-backend-api-reference)
9. [Database Schema](#-database-schema)
10. [Security & Compliance](#-security--compliance)
11. [Tracking & Analytics](#-tracking--analytics)
12. [Deployment](#-deployment)

---

## 🔍 Project Overview

Creek Lend is a **direct lending platform** that enables borrowers in the United States, Canada, and India to apply for personal loans through a secure, multi-step digital funnel. The platform is engineered for:

- **High conversion** — Framer Motion micro-animations, minimal cognitive friction, draft persistence.
- **Maximum data security** — AES-256-CBC encryption for all PII at rest, strict TLS in transit.
- **Regulatory compliance** — TCPA consent logging, Jornaya LeadID / TrustedForm integration hooks, geofencing.
- **First-party analytics resilience** — GTM Server-Side container (survives ad-blockers), Meta CAPI (survives iOS privacy restrictions).

---

## 🏗 Architecture

```
┌────────────────────────────────────────────────┐
│           Cloudflare CDN + WAF                 │
│           (Geo-IP: US, CA, IN only)            │
└──────────────────┬─────────────────────────────┘
                   │
     ┌─────────────▼──────────────┐
     │    Next.js Frontend         │  :3000
     │                             │
     │  ┌──────────────────────┐  │
     │  │ GTM Browser Snippet  │──┼──► Server-Side GTM Container
     │  │ (Server-Side URL)    │  │    (your subdomain)
     │  └──────────────────────┘  │        │
     │  ┌──────────────────────┐  │        ▼
     │  │  UTM Tracker         │  │   GA4 / Google Ads
     │  │  (sessionStorage)    │  │
     │  └──────────────────────┘  │
     └─────────────┬──────────────┘
                   │ REST API
     ┌─────────────▼──────────────┐
     │   Express.js Backend        │  :8000
     │                             │
     │  ┌──────────────────────┐  │
     │  │ AES-256 Encryption   │  │
     │  └──────────────────────┘  │
     │  ┌──────────────────────┐  │
     │  │ Meta CAPI Utility    │──┼──► Meta Graph API
     │  │ (SHA-256 PII hash)   │  │    (server-to-server)
     │  └──────────────────────┘  │
     │  ┌──────────────────────┐  │
     │  │ Geofence Middleware  │  │
     │  └──────────────────────┘  │
     └─────────────┬──────────────┘
                   │ Prisma ORM (adapter-pg)
     ┌─────────────▼──────────────┐
     │   PostgreSQL :5433          │
     │   (via Docker)              │
     └────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.1.6 | App Router, SSR, image + font optimization |
| React | 19.2.3 | UI framework |
| TypeScript | ^5 | Static typing |
| Tailwind CSS | v4 | Utility-first styling |
| Framer Motion | ^12 | Micro-animations and transitions |
| React Hook Form | ^7 | Performant form state management |
| Zod | ^4 | Schema validation |
| Lucide React | ^0.577 | Icon set |

### Backend
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥18 | JavaScript runtime |
| Express | ^5 | REST API framework |
| TypeScript | ^5.9 | Static typing |
| Prisma | ^7.4.2 | ORM with migration support |
| @prisma/adapter-pg | ^7.5 | Direct PostgreSQL driver for Prisma 7 |
| pg | ^8.20 | PostgreSQL client |
| dotenv | ^17 | Environment variable loading |
| cors | ^2.8 | Cross-origin request handling |
| nodemon | ^3 | Dev server auto-reload |

### Infrastructure
| Tool | Purpose |
|------|---------|
| PostgreSQL 15 | Relational database |
| Docker + Compose | Local database containerization |
| Cloudflare | CDN, WAF, Geo-IP headers (`cf-ipcountry`) |

---

## 📁 Monorepo Structure

```
creek-lend/
├── frontend/                        # Next.js Application
│   ├── app/
│   │   ├── layout.tsx               # Global layout, GTM injection, JSON-LD schema
│   │   ├── page.tsx                 # Homepage / Landing page
│   │   ├── apply/
│   │   │   └── page.tsx             # 5-step loan application funnel
│   │   ├── how-it-works/page.tsx    # Explainer page
│   │   ├── rates-and-fees/page.tsx  # Transparent rate breakdown
│   │   ├── faq/page.tsx             # FAQ with FAQPage schema markup
│   │   ├── contact/page.tsx         # Contact form
│   │   └── legal/
│   │       ├── privacy-policy/
│   │       ├── terms-of-service/
│   │       ├── fair-lending/
│   │       └── direct-lender-disclosure/
│   ├── src/components/
│   │   ├── GoogleTagManager.tsx     # GTM Server-Side snippet + dataLayer helper
│   │   └── UTMTracker.tsx           # Captures & persists utm_* to sessionStorage
│   ├── .env.local.example           # ← Copy to .env.local and fill in values
│   └── package.json
│
├── backend/                         # Express.js REST API
│   ├── src/
│   │   ├── index.ts                 # App entry: middleware, routes, process management
│   │   ├── controllers/
│   │   │   └── application.ts       # Loan application + bank lookup controllers
│   │   ├── routes/
│   │   │   └── application.ts       # Route registration
│   │   ├── middleware/
│   │   │   └── geofence.ts          # IP-based geofencing (US, CA, IN)
│   │   └── utils/
│   │       ├── encryption.ts        # AES-256-CBC encrypt/decrypt for PII
│   │       └── capi.ts              # Meta Conversions API (SHA-256 + server-to-server)
│   ├── prisma/
│   │   └── schema.prisma            # Database models
│   ├── .env.example                 # ← Copy to .env and fill in values
│   └── package.json
│
├── docker-compose.yml               # PostgreSQL 15 on port 5433
├── CREEK_LEND_BLUEPRINT.md          # Original technical specification
└── README.md                        # ← You are here
```

---

## ✅ Prerequisites

- **Node.js** ≥ 18.x ([download](https://nodejs.org/))
- **Docker Desktop** ([download](https://www.docker.com/products/docker-desktop/)) — for running PostgreSQL locally
- **npm** ≥ 9 (comes with Node.js)

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-org/creek-lend.git
cd creek-lend
```

### 2. Start the database

```bash
docker-compose up -d
# PostgreSQL is now running on localhost:5433
```

### 3. Set up the backend

```bash
cd backend

# Copy env template and fill in your values
cp .env.example .env

# Install dependencies
npm install

# Apply Prisma migrations (creates all tables)
npx prisma migrate dev --name init

# Start development server
npm run dev
# → Backend running at http://localhost:8000
```

### 4. Set up the frontend

```bash
cd frontend

# Copy env template and fill in your values
cp .env.local.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
# → Frontend running at http://localhost:3000
```

### 5. Verify everything works

```bash
# Check backend health
curl http://localhost:8000/health
# → {"status":"ok","message":"Creek Lend API is running"}

# Open borrower-facing application
open http://localhost:3000/apply
```

> **Prisma Studio** (visual DB browser): `cd backend && npx prisma studio` → opens on http://localhost:5555

---

## 🔐 Environment Variables

### Backend — `backend/.env`

Copy `backend/.env.example` → `backend/.env` and fill in your values.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `ENCRYPTION_KEY` | ✅ | 64-character hex string (32 bytes) for AES-256-CBC |
| `PORT` | ✅ | API server port (default: `8000`) |
| `META_PIXEL_ID` | ⬜ | Your Meta Pixel ID from Events Manager |
| `META_ACCESS_TOKEN` | ⬜ | CAPI access token from Meta Events Manager |
| `META_TEST_EVENT_CODE` | ⬜ | Test event code for sandbox validation (remove in production) |

**Generating a secure `ENCRYPTION_KEY`:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Getting Meta CAPI credentials:**
> Meta Business Manager → Events Manager → [Your Pixel] → Settings → Conversions API → Generate Access Token

---

### Frontend — `frontend/.env.local`

Copy `frontend/.env.local.example` → `frontend/.env.local` and fill in your values.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GTM_ID` | ⬜ | GTM Container ID (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GTM_SERVER_URL` | ⬜ | Server-side GTM container URL (e.g. `https://gtm.creeklend.com`). Falls back to `https://www.googletagmanager.com` if not set |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in them.

---

## 📡 Backend API Reference

Base URL: `http://localhost:8000`

### Health Check

```
GET /health
```
```json
{ "status": "ok", "message": "Creek Lend API is running" }
```

---

### Submit Loan Application

```
POST /api/applications
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "5551234567",
  "loanAmount": 5000,
  "ssn": "123-45-6789",
  "dob": "1990-01-15",
  "dlState": "NY",
  "dlNumber": "D123456789",
  "employerName": "Acme Corp",
  "monthlyIncome": 5000,
  "incomeFrequency": "MONTHLY",
  "routingNumber": "123456789",
  "accountNumber": "987654321",
  "bankName": "JPMORGAN CHASE BANK",
  "tcpaConsent": true,
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "personal-loans-q1"
}
```

**`incomeFrequency` enum:** `WEEKLY` | `BI_WEEKLY` | `MONTHLY`

**Success Response (201):**
```json
{
  "success": true,
  "applicationId": "08da10b9-a049-4e49-b713-ff259fd49bbf",
  "message": "Application submitted and encrypted successfully."
}
```

**Side effects on success:**
- Borrower record created (or matched by email)
- SSN, DL Number, and Account Number encrypted with AES-256 before DB write
- UTM tracking record created
- TCPA consent record stored with IP address and User-Agent
- Meta CAPI `Lead` event fired server-to-server (non-blocking)

---

### Bank Routing Number Lookup

```
GET /api/applications/bank-lookup/:routingNumber
```

**Parameters:** `routingNumber` — 9-digit ABA routing number

**Success Response (200):**
```json
{
  "routingNumber": "123456789",
  "bankName": "JPMORGAN CHASE BANK"
}
```

**Error Response (400):**
```json
{ "error": "Invalid routing number" }
```

---

## 🗄 Database Schema

Managed by **Prisma ORM**. Run `npx prisma migrate dev` to apply changes.

```
┌─────────────────────────┐       ┌──────────────────────────────┐
│        Borrower          │       │         Application           │
├─────────────────────────┤       ├──────────────────────────────┤
│ id (UUID PK)            │──┐    │ id (UUID PK)                 │
│ firstName               │  └──►│ borrowerId (FK)               │
│ lastName                │       │ loanAmount (Decimal 10,2)    │
│ email (UNIQUE)          │       │ status (PENDING/...)          │
│ phone                   │       │ encryptedSsn                 │
│ createdAt               │       │ encryptedDlNumber            │
│ updatedAt               │       │ encryptedAccountNum          │
└─────────────────────────┘       │ dlState                      │
                                   │ dob                          │
                                   │ employerName                 │
                                   │ monthlyIncome (Decimal 10,2) │
                                   │ incomeFrequency              │
                                   │ routingNumber                │
                                   │ bankName                     │
                                   │ createdAt                    │
                                   └──────────────┬───────────────┘
                                                  │
                    ┌─────────────────────────────┴────────────────┐
                    │                                               │
          ┌─────────▼──────────────┐              ┌────────────────▼──────────┐
          │      UTMTracking        │              │       ConsentRecord        │
          ├────────────────────────┤              ├──────────────────────────  ┤
          │ id (UUID PK)           │              │ id (UUID PK)               │
          │ applicationId (FK,UQ)  │              │ applicationId (FK)         │
          │ source                 │              │ type (TCPA)                │
          │ medium                 │              │ agreed (Boolean)           │
          │ campaign               │              │ ipAddress                  │
          │ content                │              │ userAgent                  │
          │ term                   │              │ jornayaLeadId              │
          └────────────────────────┘              │ trustedFormCertUrl         │
                                                  │ tcpaAcceptedAt             │
                                                  └────────────────────────────┘
```

---

## 🔒 Security & Compliance

### PII Encryption (AES-256-CBC)

All sensitive fields are encrypted **before** writing to the database using a 32-byte key stored only in environment variables. The ciphertext is stored as a hex string (`iv:ciphertext`).

**Encrypted fields:**
- `SSN / National ID`
- `Driver's License Number`
- `Bank Account Number`

### Geofencing

Every API request passes through `src/middleware/geofence.ts`:
- **Allowed regions:** United States (`US`), Canada (`CA`), India (`IN`)
- **Detection method:** `cf-ipcountry` header (Cloudflare) or `x-country-code` header
- **Local development:** Localhost (`::1`, `127.0.0.1`) is always allowed
- **Blocked traffic:** Returns `403 Forbidden`

### TCPA Compliance

On every application submission, a `ConsentRecord` is created with:
- IP address of the requester
- User-Agent string
- Timestamp of consent (`tcpaAcceptedAt`)
- Hooks for **Jornaya LeadID** and **TrustedForm** certificate URL

### Data in Transit

- All production endpoints must be served over **TLS 1.3 / HTTPS**
- CORS is configured to allow only the known frontend origin

---

## 📊 Tracking & Analytics

### Google Stack — GTM Server-Side + GA4

The browser GTM snippet (`GoogleTagManager.tsx`) loads JavaScript from your **server-side GTM container URL** instead of `googletagmanager.com` directly. This makes the request invisible to most ad-blockers, preventing attribution loss.

**dataLayer events fired:**

| Event Name | When | Payload |
|------------|------|---------|
| `funnel_step_complete` | User advances between form steps | `step_index`, `step_name`, `next_step` |
| `application_submitted` | Successful submission | `event_id` (applicationId), `currency`, `value` |

**GTM configuration:**
1. Create a **GA4 Configuration Tag** triggered on "All Pages".
2. Create a **GA4 Event Tag** triggered on custom event `application_submitted` — maps to a GA4 `generate_lead` or `conversion` event.
3. In your **server-side GTM container**, add a GA4 client and forward events to GA4 and Google Ads.

### Meta/Facebook — Conversions API (CAPI)

After every successful application insert, the backend fires a `Lead` event to Meta's Graph API **server-to-server** — bypassing iOS privacy restrictions, Safari ITP, and browser-side ad-blockers.

**Deduplication:** the `event_id` sent to CAPI matches the `applicationId`. If you also run the Meta browser Pixel firing a `Lead` event on `application_submitted`, Meta will deduplicate them and count only one event.

**PII handling:** Email, phone, and name are **SHA-256 hashed** before transmission, in compliance with Meta CAPI's data requirements.

---

## 🚀 Deployment

### Frontend → Vercel

```bash
cd frontend
vercel --prod
```

Set these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GTM_SERVER_URL`

### Backend → Render / Railway / AWS EC2

**Build command:**
```bash
cd backend && npm install && npm run build
```

**Start command:**
```bash
node dist/index.js
```

**Required environment variables on your host:**
- `DATABASE_URL`
- `ENCRYPTION_KEY`
- `PORT`
- `META_PIXEL_ID`
- `META_ACCESS_TOKEN`

### Database → Managed PostgreSQL (Neon / Supabase / RDS)

Update `DATABASE_URL` in your backend host to point to your managed database, then run:
```bash
npx prisma migrate deploy
```

### CI/CD (GitHub Actions example)

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: cd backend && npm ci && npm run build
      - run: cd backend && npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      # Add your deploy step (Render deploy hook, AWS CodeDeploy, etc.)
```

---

## 📜 License

ISC © Creek Lend

---

*Built with precision for the modern lending industry.*
]]>
