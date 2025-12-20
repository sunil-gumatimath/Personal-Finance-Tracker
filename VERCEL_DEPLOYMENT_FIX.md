# Vercel Deployment Checklist

## Issue: Blank Black Page on Vercel

The blank page issue is most likely caused by **missing environment variables** on Vercel.

## Solution: Add Environment Variables to Vercel

### Step 1: Get Your Supabase Credentials
From your local `.env` file, you need:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Step 2: Add Environment Variables on Vercel

1. **Go to Vercel Dashboard**
   - Navigate to https://vercel.com/dashboard
   - Select your project: `personal-finance-tracker`

2. **Open Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Add Variables**
   Add the following environment variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: [Your Supabase URL from .env file]
   - Environment: Production, Preview, Development (select all)

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: [Your Supabase Anon Key from .env file]
   - Environment: Production, Preview, Development (select all)

4. **Save Changes**
   - Click "Save" for each variable

### Step 3: Redeploy

After adding the environment variables:
1. Go to the "Deployments" tab
2. Click on the latest deployment
3. Click the three dots menu (⋮)
4. Select "Redeploy"
5. Confirm the redeployment

### Step 4: Check Browser Console

Once redeployed, open your Vercel site and:
1. Open browser DevTools (F12)
2. Go to the "Console" tab
3. Look for these logs:
   - "🚀 Application initializing..."
   - "Supabase URL present: true/false"
   - "Supabase Anon Key present: true/false"

If you see "false" for either, the environment variables aren't set correctly.

## Alternative: Quick Check

If you want to quickly verify the environment variables are working:
1. Open your deployed site in a browser
2. Open DevTools Console (F12)
3. Look for initialization logs

## Files Changed in This Fix

1. **vercel.json** - Now configured for Bun
2. **.vercelrc** - Tells Vercel to use Bun runtime
3. **src/lib/supabase.ts** - Added detailed logging
4. **src/main.tsx** - Added initialization logging

## Expected Console Output

When working correctly, you should see:
```
🚀 Application initializing...
Environment: production
✓ Root element found, rendering app...
Supabase URL present: true
Supabase Anon Key present: true
✓ App render initiated
```

## Still Having Issues?

If the page is still blank after:
1. Check Vercel build logs for errors
2. Check browser console for JavaScript errors
3. Verify both environment variables are set correctly
4. Make sure you selected all environments (Production, Preview, Development)
