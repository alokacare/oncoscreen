export type View = 'overview' | 'patient' | 'technician' | 'clinician' | 'audit' | 'ai';

export interface DemoAnswer {
  prompt: string;
  answer: string;
}

export interface DemoSubmission {
  assessmentId: string;
  status: 'submitted_for_clinician_review';
  submittedAt: string;
  synthetic: true;
  answers: DemoAnswer[];
}
