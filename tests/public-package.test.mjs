import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('sample assessment is explicitly synthetic', async () => {
  const sample = JSON.parse(await readFile(new URL('../sample-data/fictional-assessment.json', import.meta.url), 'utf8'));
  assert.equal(sample.synthetic, true);
  assert.match(sample.assessmentId, /^SHOWCASE-/);
  assert.equal(sample.status, 'submitted_for_clinician_review');
});

test('sample assessment contains no medical result fields', async () => {
  const sample = JSON.parse(await readFile(new URL('../sample-data/fictional-assessment.json', import.meta.url), 'utf8'));
  const serialised = JSON.stringify(sample).toLowerCase();
  for (const field of ['riskscore', 'clinicalscore', 'triggeredrule', 'diagnosis']) {
    assert.equal(serialised.includes(field), false, `Unexpected result field: ${field}`);
  }
});

test('mock API contract returns review status rather than a clinical result', async () => {
  const contract = await readFile(new URL('../api/openapi.yaml', import.meta.url), 'utf8');
  assert.match(contract, /submitted_for_clinician_review/);
  assert.doesNotMatch(contract, /diagnosis|clinicalScore|riskScore|threshold/i);
});

test('public story describes responsible AI without claiming a deployed clinical model', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.match(readme, /TRL4 laboratory prototype/);
  assert.match(readme, /Responsible AI direction/);
  assert.match(app, /Governed data first\. AI second\. Human decisions always\./);
  assert.match(app, /no patient-trained model is included/i);
  assert.doesNotMatch(`${readme}\n${app}`, /TRL\s*5|99\.31|99\.64|99\.95|detects cancer|guaranteed accuracy/i);
});

test('public UI does not include protected clinical implementation terms', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /clinicalScore|riskScore|triggeredRule|decision threshold|model weights/i);
});
