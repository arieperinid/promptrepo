-- Versions table
CREATE TABLE versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  version TEXT NOT NULL CHECK (char_length(version) >= 1),
  content TEXT NOT NULL CHECK (char_length(content) >= 1),
  variables JSONB DEFAULT '{}',
  changelog TEXT CHECK (char_length(changelog) <= 1000),
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  -- Ensure version uniqueness per prompt
  CONSTRAINT unique_prompt_version UNIQUE (prompt_id, version)
);

-- Indexes
CREATE INDEX idx_versions_prompt_id ON versions (prompt_id);
CREATE INDEX idx_versions_is_published ON versions (is_published);
CREATE INDEX idx_versions_created_at ON versions (created_at);
CREATE INDEX idx_versions_prompt_published ON versions (prompt_id, is_published);
CREATE INDEX idx_versions_variables ON versions USING GIN (variables);

-- Updated at trigger
CREATE TRIGGER update_versions_updated_at
  BEFORE UPDATE ON versions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
