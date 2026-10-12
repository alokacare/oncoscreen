import type { DemoAnswer } from './types';

export const demoQuestions = [
  {
    id: 'demo-concern',
    prompt: 'Have you noticed a recent change you would like a clinician to review?',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'demo-discussed',
    prompt: 'Have you already discussed this concern with a healthcare professional?',
    options: ['Yes', 'No'],
  },
  {
    id: 'demo-follow-up',
    prompt: 'Would you like support arranging an appropriate follow-up?',
    options: ['Yes', 'No'],
  },
] as const;

export const initialAnswers: DemoAnswer[] = demoQuestions.map((question) => ({
  prompt: question.prompt,
  answer: '',
}));

export const auditEvents = [
  ['09:30:01', 'Synthetic profile opened', 'Patient demo'],
  ['09:31:18', 'Demonstration responses submitted', 'Patient demo'],
  ['09:31:18', 'Receipt created', 'Showcase service'],
  ['09:32:04', 'Submission viewed', 'Technician demo'],
  ['09:33:12', 'Human review recorded', 'Clinician demo'],
] as const;
