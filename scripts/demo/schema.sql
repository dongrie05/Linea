CREATE TABLE IF NOT EXISTS linea_demo_invites (
  id uuid PRIMARY KEY,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  revoked_at timestamptz,
  calls_used integer NOT NULL DEFAULT 0 CHECK (calls_used BETWEEN 0 AND 5),
  reservation_id uuid,
  vapi_call_id uuid,
  CHECK (vapi_call_id IS NULL OR reservation_id IS NOT NULL)
);
