BEGIN;

CREATE TABLE IF NOT EXISTS evidence_comparison (
  comparison_id text PRIMARY KEY,
  schema_version text NOT NULL CHECK (schema_version = 'hotel-shoreline-comparison-evidence-v1'),
  recorded_at timestamptz NOT NULL,
  case_id text NOT NULL,
  locale text NOT NULL CHECK (locale IN ('en', 'es-ES', 'pt-PT')),
  aggregate_eligible boolean NOT NULL,
  content_hash character(64) NOT NULL CHECK (content_hash ~ '^[a-f0-9]{64}$'),
  record jsonb NOT NULL CHECK (jsonb_typeof(record) = 'object')
);

CREATE INDEX IF NOT EXISTS evidence_comparison_recorded_at_idx
  ON evidence_comparison (recorded_at DESC, comparison_id ASC);

CREATE TABLE IF NOT EXISTS evidence_run (
  run_id text PRIMARY KEY,
  comparison_id text NOT NULL REFERENCES evidence_comparison(comparison_id),
  treatment_arm text NOT NULL CHECK (treatment_arm IN ('baseline', 'contract_guided')),
  status text NOT NULL CHECK (status IN ('planning_failed', 'rejected', 'failed', 'partial_failure', 'succeeded')),
  error_code text,
  provider text NOT NULL,
  model text NOT NULL,
  configuration_hash character(64) NOT NULL,
  condition_hash character(64) NOT NULL,
  source_hash character(64) NOT NULL,
  contract_version text NOT NULL,
  fixture_version text NOT NULL,
  tool_contract_version text NOT NULL,
  intervention_id text NOT NULL,
  intervention_version text NOT NULL,
  UNIQUE (comparison_id, treatment_arm)
);

CREATE TABLE IF NOT EXISTS evidence_run_event (
  run_id text NOT NULL REFERENCES evidence_run(run_id),
  sequence integer NOT NULL CHECK (sequence > 0),
  event_type text NOT NULL,
  PRIMARY KEY (run_id, sequence)
);

CREATE TABLE IF NOT EXISTS evidence_run_artifact (
  run_id text NOT NULL REFERENCES evidence_run(run_id),
  artifact_type text NOT NULL CHECK (artifact_type IN ('request', 'candidate_graph', 'validation', 'operations', 'terminal_outcome')),
  schema_version text NOT NULL,
  content_hash character(64) NOT NULL CHECK (content_hash ~ '^[a-f0-9]{64}$'),
  payload jsonb NOT NULL,
  PRIMARY KEY (run_id, artifact_type)
);

CREATE TABLE IF NOT EXISTS evidence_evaluation (
  run_id text NOT NULL REFERENCES evidence_run(run_id),
  revision integer NOT NULL CHECK (revision > 0),
  source_hash character(64) NOT NULL,
  aggregate_eligible boolean NOT NULL,
  exclusion_reasons jsonb NOT NULL CHECK (jsonb_typeof(exclusion_reasons) = 'array'),
  measures jsonb NOT NULL CHECK (jsonb_typeof(measures) = 'array'),
  first_loss_stage text NOT NULL,
  PRIMARY KEY (run_id, revision)
);

CREATE TABLE IF NOT EXISTS evidence_intervention (
  intervention_id text NOT NULL,
  version text NOT NULL,
  content_hash character(64) NOT NULL CHECK (content_hash ~ '^[a-f0-9]{64}$'),
  specification jsonb NOT NULL CHECK (jsonb_typeof(specification) = 'object'),
  PRIMARY KEY (intervention_id, version)
);

CREATE TABLE IF NOT EXISTS evidence_review_annotation (
  annotation_id text PRIMARY KEY,
  run_id text NOT NULL REFERENCES evidence_run(run_id),
  revision integer NOT NULL CHECK (revision > 0),
  reviewer_id text NOT NULL,
  reviewer_role text NOT NULL,
  reviewed_at timestamptz NOT NULL,
  confidence text NOT NULL CHECK (confidence IN ('low', 'medium', 'high')),
  representation_limitations jsonb NOT NULL CHECK (jsonb_typeof(representation_limitations) = 'array'),
  notes text NOT NULL,
  UNIQUE (run_id, reviewer_id, revision)
);

COMMIT;
