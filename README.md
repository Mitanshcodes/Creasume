# Creasume

> The Resume for the Creator Economy — turn your social presence into a live professional profile.

## Stack

- Next.js 16 · TypeScript strict · Tailwind CSS v4 · shadcn/ui
- Supabase (Postgres + Auth + Storage) · Prisma v7 ORM · NextAuth.js v5
- Instagram Graph API · YouTube Data + Analytics API v3
- Recharts · Lucide React · date-fns · Zod · React Hook Form · dnd-kit

---

## Local setup

### 1. Clone & install

```bash
git clone https://github.com/Mitanshcodes/Creasume
cd Creasume
pnpm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → Database → Connection string** and grab:
   - **Transaction pooler** URL → `DATABASE_URL`
   - **Session mode / direct** URL → `DIRECT_URL`

### 3. Get API credentials

**Google OAuth (for sign-in + YouTube)**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials → Web application
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Enable **YouTube Data API v3** and **YouTube Analytics API**

**Meta / Instagram**
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create an app → Consumer type
3. Add Facebook Login product
4. Add redirect URI: `http://localhost:3000/api/connections/instagram/callback`
5. Add test users via **Roles → Test Users**
6. Note: `instagram_manage_insights` requires Meta App Review before production

### 4. Create `.env.local`

```bash
cp .env.example .env.local
```

Fill in all values. Generate secrets:

```bash
# ENCRYPTION_KEY (32 bytes → 64 hex chars)
openssl rand -hex 32

# NEXTAUTH_SECRET
openssl rand -base64 32

# CRON_SECRET
openssl rand -base64 32
```

### 5. Run migrations & seed

```bash
pnpm db:push       # push schema to Supabase (dev)
pnpm db:seed       # create the demo creator at /demo
```

For production, use migrations:
```bash
pnpm db:migrate    # generate + apply migration
```

### 6. Start dev server

```bash
pnpm dev
```

Visit `http://localhost:3000` — the landing page. Visit `http://localhost:3000/demo` — the demo Influence Card.

---

## Project structure

```
src/
├── app/
│   ├── (marketing)/        # Landing page
│   ├── (auth)/             # Login + signup
│   ├── dashboard/          # Creator dashboard (auth-gated)
│   ├── [username]/         # Public Influence Card
│   └── api/                # API routes (auth, connections, cron)
├── components/
│   ├── ui/                 # shadcn components
│   ├── influence-card/     # Public profile sections
│   └── dashboard/          # Dashboard components
└── lib/
    ├── db.ts               # Prisma client singleton
    ├── auth.ts             # NextAuth config
    ├── env.ts              # Zod-validated env vars
    ├── encryption.ts       # AES-256-GCM token encryption
    ├── instagram.ts        # Instagram Graph API client
    ├── youtube.ts          # YouTube Data + Analytics client
    └── utils.ts            # Helpers (cn, formatCompact, timeAgo)
```

---

## Deploy to Vercel

1. Connect your GitHub repo to Vercel
2. Add all env vars from `.env.example` in Vercel dashboard
3. Vercel Cron is configured in `vercel.json` — fires daily at 03:00 UTC

---

## Development commands

```bash
pnpm dev            # start dev server
pnpm build          # production build
pnpm lint           # ESLint
pnpm format         # Prettier
pnpm type-check     # TypeScript strict check
pnpm db:generate    # re-generate Prisma client
pnpm db:migrate     # run migrations
pnpm db:seed        # seed demo data
pnpm db:studio      # open Prisma Studio
```
