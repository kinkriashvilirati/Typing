# Supabase setup

The `game_scores` table and its Row Level Security policies must exist before the frontend can save scores.

After creating that table, run [`sql/require-codev-email.sql`](./sql/require-codev-email.sql) in the Supabase SQL Editor.

The SQL function does not run until the hook is enabled:

1. Open **Authentication → Hooks** in Supabase.
2. Choose **Before User Created**.
3. Choose the Postgres function `public.hook_restrict_signup_to_codev`.
4. Save and enable the hook.

Also set the production **Site URL** and allowed local/Netlify redirect URLs under **Authentication → URL Configuration**.

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to the Netlify site's environment variables before deploying.

Supabase's built-in email sender is only suitable for initial testing and only sends to project-team addresses. Email confirmation for other `@codev.io` users requires a custom SMTP provider under **Authentication → SMTP Settings**.
