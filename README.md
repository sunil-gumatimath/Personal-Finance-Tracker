# FinanceTrack

A modern personal finance tracker built with React, TypeScript, Vite, and Supabase.

## Features

- 📊 **Dashboard** - Overview with stats and charts
- 💳 **Transactions** - Track income and expenses with recurring transaction support
- 🎯 **Budgets** - Set limits and track progress
- � **Goals** - Financial goals with progress tracking and milestones
- �🏷️ **Categories** - Custom organization
- � **Accounts** - Manage multiple accounts
- �🔐 **Authentication** - Secure Supabase Auth
- 🌓 **Dark Mode** - Light, dark, and system theme options

## Getting Started

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Setup Backend**
   - Create a project at [Supabase](https://supabase.com)
   - Run the contents of `supabase/schema.sql` in the SQL Editor
   - (Optional) Run `supabase/seed_data.sql` to populate sample data

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

4. **Run Development Server**
   ```bash
   bun run dev
   ```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Backend**: Supabase (Auth, Database)
- **Charts**: Recharts
