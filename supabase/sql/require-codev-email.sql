-- Run this once in Supabase SQL Editor.
-- Then enable it in Authentication > Hooks > Before User Created.

create or replace function public.hook_restrict_signup_to_codev(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  email_address text;
begin
  email_address := lower(coalesce(event->'user'->>'email', ''));

  if email_address !~ '^[^@[:space:]]+@codev[.]io$' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'Only @codev.io email addresses can register.'
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.hook_restrict_signup_to_codev(jsonb) to supabase_auth_admin;
revoke execute on function public.hook_restrict_signup_to_codev(jsonb) from authenticated, anon, public;

create index if not exists game_scores_user_game_created_idx
on public.game_scores (user_id, game, created_at desc);
