# Personal Finance Tracker

A comprehensive personal finance management application designed to help users track expenses, manage budgets, and achieve financial goals. Built with modern web technologies, this application offers a responsive and intuitive user interface for managing all aspects of personal finance.

## Features

- **Dashboard**: Real-time overview of financial health including total balance, monthly income, expenses, and net savings. Includes visual spending charts and category breakdowns.
- **Transaction Management**: Record income, expenses, and transfers. Support for recurring transactions (daily, weekly, monthly, yearly) and CSV export.
- **Budgeting**: Create and track monthly budgets per category with visual progress indicators and alerts.
- **Financial Goals**: Set savings targets with deadlines and track contributions over time.
- **Calendar View**: Monthly visualization of financial activities to track daily spending and income patterns.
- **Account Management**: Support for multiple account types including Checking, Savings, Credit Cards, Investments, and Cash.
- **Category Customization**: Flexible category system for organizing income and expenses.
- **Security**: Secure authentication and Row Level Security (RLS) ensuring data privacy.
- **Responsive Design**: Fully responsive interface with Dark Mode support and Progressive Web App (PWA) capabilities for mobile installation.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Shadcn UI (Radix UI)
- **State Management**: React Context API
- **Routing**: React Router DOM 7
- **Charts**: Recharts
- **Backend**: Supabase (PostgreSQL, Authentication)
- **Icons**: Lucide React
- **Internationalization**: Support for multiple currencies (USD, EUR, GBP, JPY, INR, etc.)

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- npm or bun
- A Supabase account

## Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd personal-finance-tracker
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Create a `.env` file in the root directory based on `.env.example`:

    ```bash
    cp .env.example .env
    ```

    Update the following variables with your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup**

    - Log in to your Supabase dashboard.
    - Navigate to the SQL Editor.
    - Copy the contents of `supabase/database.sql` and run it. This will set up all necessary tables, policies, and functions.
    - (Optional) Use the `seed_my_data()` function within the application or via SQL to populate demo data.

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Build

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/components`: Reusable UI components and layout elements.
- `src/contexts`: React Context providers (AuthContext).
- `src/pages`: Main application views (Dashboard, Transactions, Budgets, etc.).
- `src/lib`: Utility functions and Supabase client configuration.
- `src/types`: TypeScript definitions and interfaces.
- `supabase`: Database schemas and SQL scripts.

## Database Schema

The application uses a relational database structure with the following key tables:

- **profiles**: User information and preferences (currency).
- **accounts**: Financial accounts (bank, cash, etc.).
- **categories**: Income and expense categories.
- **transactions**: Financial records linked to accounts and categories.
- **budgets**: Spending limits per category.
- **goals**: Savings targets.

All tables are protected by Row Level Security (RLS) policies, ensuring users can only access their own data.
