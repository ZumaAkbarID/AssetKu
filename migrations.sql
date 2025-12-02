-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.account_sources (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['Savings'::text, 'RDN'::text])),
  currency text NOT NULL DEFAULT 'IDR'::text CHECK (currency = ANY (ARRAY['USD'::text, 'IDR'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT account_sources_pkey PRIMARY KEY (id)
);
CREATE TABLE public.assets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  name text NOT NULL,
  category text NOT NULL CHECK (category = ANY (ARRAY['Indo Stock'::text, 'US Stock'::text, 'Crypto'::text])),
  quantity numeric NOT NULL,
  avg_price numeric NOT NULL,
  current_price numeric NOT NULL,
  currency text NOT NULL CHECK (currency = ANY (ARRAY['USD'::text, 'IDR'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT assets_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cash_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL,
  date timestamp with time zone NOT NULL DEFAULT now(),
  type text NOT NULL CHECK (type = ANY (ARRAY['Income'::text, 'Outcome'::text])),
  amount numeric NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  performer text,
  CONSTRAINT cash_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT cash_transactions_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.account_sources(id)
);
CREATE TABLE public.portfolio_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  date date NOT NULL,
  value numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT portfolio_history_pkey PRIMARY KEY (id)
);