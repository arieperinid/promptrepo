-- Validators table
CREATE TABLE validators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  type TEXT NOT NULL CHECK (type IN ('regex', 'length', 'contains', 'custom')),
  config JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_validators_prompt_id ON validators (prompt_id);
CREATE INDEX idx_validators_type ON validators (type);
CREATE INDEX idx_validators_is_active ON validators (is_active);
CREATE INDEX idx_validators_created_at ON validators (created_at);
CREATE INDEX idx_validators_config ON validators USING GIN (config);

-- Updated at trigger
CREATE TRIGGER update_validators_updated_at
  BEFORE UPDATE ON validators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
