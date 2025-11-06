# Help Desk Ticketing Site (Render-ready)

Modern, user-friendly ticketing app with chat per ticket, statuses, email on ticket creation, auto NEW_ALERT on user replies, ID search, and a helpdesk dashboard.

## Quick Start
```bash
npm i
cp .env.example .env
# fill env vars
npx prisma migrate dev --name init
npm run dev
```

## Deploy to Render
- Push to GitHub
- Create a Blueprint on Render (uses `render.yaml`)
- Set env vars: `ADMIN_EMAIL`, `SMTP_*`, `ORIGIN`
