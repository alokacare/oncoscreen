import type { DemoAnswer, DemoSubmission } from './types';

const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

/**
 * Public demonstration adapter. It stores nothing, calls no server and performs
 * no medical calculation. The receipt is intentionally fixed and synthetic.
 */
export async function submitSyntheticAssessment(answers: DemoAnswer[]): Promise<DemoSubmission> {
  await wait(350);
  return {
    assessmentId: 'SHOWCASE-DEMO-001',
    status: 'submitted_for_clinician_review',
    submittedAt: '2026-10-12T09:31:18+05:30',
    synthetic: true,
    answers: answers.map((answer) => ({ ...answer })),
  };
}
