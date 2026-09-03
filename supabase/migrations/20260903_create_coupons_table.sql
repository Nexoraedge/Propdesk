CREATE TABLE public.coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
    max_uses INTEGER NULL,
    current_uses INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- Example Seed Data
INSERT INTO public.coupons (code, discount_type, discount_value, max_uses)
VALUES ('WELCOME20', 'percentage', 20, 100);

INSERT INTO public.coupons (code, discount_type, discount_value, expires_at)
VALUES ('MINUS100', 'fixed', 100, now() + interval '30 days');
