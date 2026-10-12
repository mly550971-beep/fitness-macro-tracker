# FormaFit — Fitness & Macro Tracker

A starter monorepo for a calorie, macro, meals, and activity tracker.

## Stack
- React + Vite + CSS (responsive glassmorphism UI)
- Express API with Helmet, strict CORS, rate limits, input validation
- PostgreSQL + Prisma schema
- Vitest + Supertest API smoke tests

## Requirements
Node.js 20+, npm, and PostgreSQL 15+.

## Run locally
1. Copy `server/.env.example` to `server/.env` and set a strong `SESSION_SECRET` and valid `DATABASE_URL`.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run prisma:generate -w server`
4. Apply schema: `npm run prisma:migrate -w server -- --name init`
5. Start both apps: `npm run dev`
6. Frontend: http://localhost:5173 ; API health: http://localhost:4000/api/health

For local development, `COOKIE_SECURE=false` is expected. Set it to `true` behind HTTPS in production.

## Current scope and limitations
The dashboard is a starter UI. Meal entries are currently client-side demo state; persistence endpoints, authentication, and authorization must be completed before using real accounts. The API includes security middleware and a health endpoint, not a finished production auth system. Macro and activity figures in the demo are sample values.

## Security checklist
See `SECURITY_CHECKLIST.md`. Do not commit `.env` files or real secrets. If a secret was ever committed, revoke/rotate it; deleting it from the latest commit is not enough.

## Live website (GitHub Pages)
This repo auto-publishes the frontend as a website on every push to `main`.

One-time setup: on GitHub go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
After the first workflow run finishes (Actions tab), the site is live at `https://<your-username>.github.io/<repo-name>/`.

Note: the public site is the frontend demo only. The Express/PostgreSQL API in `server/` is not hosted on GitHub Pages.
