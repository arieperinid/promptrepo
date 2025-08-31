-- Billing table
CREATE TABLE billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  -- Ensure one billing record per user
  CONSTRAINT unique_user_billing UNIQUE (user_id)
);

-- Indexes
CREATE INDEX idx_billing_user_id ON billing (user_id);
CREATE INDEX idx_billing_stripe_customer_id ON billing (stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX idx_billing_stripe_subscription_id ON billing (stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL;
CREATE INDEX idx_billing_plan ON billing (plan);
CREATE INDEX idx_billing_status ON billing (status);
CREATE INDEX idx_billing_period_end ON billing (current_period_end) WHERE current_period_end IS NOT NULL;

-- Updated at trigger
CREATE TRIGGER update_billing_updated_at
  BEFORE UPDATE ON billing
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
