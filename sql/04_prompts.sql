-- Prompts table  
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_id UUID NOT NULL REFERENCES segments(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) >= 1),
  variables JSONB DEFAULT '{}',
  "order" INTEGER NOT NULL DEFAULT 0 CHECK ("order" >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_prompts_segment_id ON prompts (segment_id);
CREATE INDEX idx_prompts_segment_order ON prompts (segment_id, "order");
CREATE INDEX idx_prompts_is_active ON prompts (is_active);
CREATE INDEX idx_prompts_created_at ON prompts (created_at);
CREATE INDEX idx_prompts_variables ON prompts USING GIN (variables);

-- Updated at trigger
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
