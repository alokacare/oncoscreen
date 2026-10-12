import { useMemo, useState } from 'react';
import { auditEvents, demoQuestions, initialAnswers } from './data';
import { submitSyntheticAssessment } from './mockApi';
import type { DemoAnswer, DemoSubmission, View } from './types';

const Icon = ({ children }: { children: string }) => <span className="icon" aria-hidden="true">{children}</span>;

function Header({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items: Array<[View, string]> = [
    ['overview', 'Overview'], ['patient', 'Patient'], ['technician', 'Technician'],
    ['clinician', 'Clinician'], ['audit', 'Audit'], ['ai', 'AI Roadmap'],
  ];
  return <header className="topbar">
    <button className="brand" onClick={() => setView('overview')} aria-label="OncoScreen overview">
      <span className="mark">◒</span><span>OncoScreen</span>
    </button>
    <nav aria-label="Showcase interfaces">
      {items.map(([key, label]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}>{label}</button>)}
    </nav>
    <span className="demo-chip">Aloka Care showcase</span>
  </header>;
}

function Overview({ begin, openAi }: { begin: () => void; openAi: () => void }) {
  return <main>
    <section className="hero">
      <div>
        <p className="eyebrow">ALOKA CARE · PUBLIC HACKATHON SHOWCASE</p>
        <h1>A trusted data foundation for AI-assisted breast-health navigation.</h1>
        <p className="lead">OncoScreen connects accessible patient check-ins, assisted operations, professional review and longitudinal evidence—creating the governed foundation required for responsible future AI.</p>
        <div className="actions">
          <button className="primary" onClick={begin}>Launch synthetic walkthrough <span>→</span></button>
          <button className="secondary" onClick={openAi}>Explore AI roadmap</button>
        </div>
      </div>
      <div className="phone" aria-label="OncoScreen mobile preview">
        <div className="phone-top" />
        <div className="mobile-brand"><span className="mobile-mark">◒</span><b>OncoScreen</b><small>Early attention. Connected care.</small></div>
        <div className="mobile-card"><Icon>✓</Icon><span><b>Simple check-in</b><small>Designed for self or assisted use</small></span></div>
        <div className="mobile-card"><Icon>♙</Icon><span><b>Human review</b><small>Professional oversight remains central</small></span></div>
        <div className="mobile-card"><Icon>↻</Icon><span><b>Continuity</b><small>Each interaction remains traceable</small></span></div>
        <button onClick={begin}>Begin demo</button>
      </div>
    </section>
    <section className="feature-grid">
      <article><Icon>1</Icon><h2>Patient experience</h2><p>Short, accessible digital interactions for individuals or supported community workflows.</p></article>
      <article><Icon>2</Icon><h2>Operations workspace</h2><p>A clear queue helps authorised teams coordinate completeness and follow-up.</p></article>
      <article><Icon>3</Icon><h2>Professional oversight</h2><p>Review actions remain explicitly human-controlled and separately recorded.</p></article>
      <article><Icon>4</Icon><h2>Traceable evidence</h2><p>Identifiers, timestamps and events form a transparent synthetic demonstration trail.</p></article>
    </section>
    <section className="startup-section">
      <div className="section-heading"><p className="eyebrow">STARTUP SNAPSHOT</p><h2>From fragmented first contact to a traceable care pathway.</h2></div>
      <div className="startup-grid">
        <article><small>PROBLEM</small><h3>Late and fragmented access</h3><p>Women and frontline teams need a clearer route from first concern to appropriate professional follow-up.</p></article>
        <article><small>SOLUTION</small><h3>Connected workflow</h3><p>A structured digital front door linking patient intake, assisted screening, human review and longitudinal records.</p></article>
        <article><small>CUSTOMERS</small><h3>Institutional deployment</h3><p>Hospitals, screening programmes, employers, public-health partners and community organisations.</p></article>
        <article><small>BUSINESS MODEL</small><h3>B2B and B2B2C</h3><p>Annual licences, per-assessment plans, white-label deployments and implementation support.</p></article>
      </div>
    </section>
    <section className="ai-preview">
      <div><p className="eyebrow">RESPONSIBLE AI PATH</p><h2>Build the evidence before building the model.</h2><p>The current TRL4 platform is deliberately clinician-led. Future AI research begins only with consented, representative and clinician-confirmed data, followed by external validation and silent-mode evaluation.</p></div>
      <button className="primary" onClick={openAi}>View responsible AI plan <span>→</span></button>
    </section>
    <section className="boundary"><b>Showcase boundary</b><p>This repository contains a non-clinical mock demonstration. It has no real decision engine, no production backend, no patient data and no diagnostic capability.</p></section>
  </main>;
}

function PatientDemo({ onSubmitted }: { onSubmitted: (submission: DemoSubmission) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DemoAnswer[]>(initialAnswers);
  const [busy, setBusy] = useState(false);
  const question = demoQuestions[Math.min(step, demoQuestions.length - 1)];
  const select = (answer: string) => {
    setAnswers((current) => current.map((item, index) => index === step ? { ...item, answer } : item));
    window.setTimeout(() => setStep((current) => Math.min(current + 1, demoQuestions.length)), 180);
  };
  const submit = async () => {
    setBusy(true);
    const result = await submitSyntheticAssessment(answers);
    onSubmitted(result);
    setStep(demoQuestions.length + 1);
    setBusy(false);
  };
  if (step === demoQuestions.length + 1) return <Workspace title="Submission received" subtitle="Patient-safe confirmation">
    <div className="receipt"><div className="success-ring">✓</div><h2>Submitted for professional review</h2><p>Your demonstration responses have been received. No diagnosis or medical result is shown.</p><dl><div><dt>Reference</dt><dd>SHOWCASE-DEMO-001</dd></div><div><dt>Data</dt><dd>Synthetic only</dd></div></dl><button className="secondary" onClick={() => { setStep(0); setAnswers(initialAnswers); }}>Restart walkthrough</button></div>
  </Workspace>;
  return <Workspace title="Patient check-in" subtitle="Fictional profile · Asha Demo">
    <div className="patient-layout">
      <aside className="profile-card"><span className="avatar">AD</span><h2>Asha Demo</h2><p>Fictional adult profile</p><hr/><small>DEMONSTRATION ONLY</small><b>No information leaves this browser.</b></aside>
      <section className="question-card">
        <div className="progress"><span style={{ width: `${Math.min(step + 1, demoQuestions.length) / demoQuestions.length * 100}%` }} /></div>
        {step < demoQuestions.length ? <>
          <p className="eyebrow">QUESTION {step + 1} OF {demoQuestions.length}</p>
          <h2>{question.prompt}</h2>
          <div className="option-list">{question.options.map((option) => <button key={option} onClick={() => select(option)}>{option}<span>›</span></button>)}</div>
          {step > 0 && <button className="text-button" onClick={() => setStep(step - 1)}>← Previous question</button>}
        </> : <>
          <p className="eyebrow">REVIEW</p><h2>Review demonstration responses</h2>
          <div className="answer-list">{answers.map((item, index) => <div key={item.prompt}><span>{index + 1}</span><p>{item.prompt}<b>{item.answer}</b></p><button onClick={() => setStep(index)}>Edit</button></div>)}</div>
          <button className="primary wide" disabled={busy} onClick={submit}>{busy ? 'Submitting…' : 'Submit for professional review'}</button>
        </>}
      </section>
    </div>
  </Workspace>;
}

function Workspace({ title, subtitle, statusText = 'Local synthetic data', children }: { title: string; subtitle: string; statusText?: string; children: React.ReactNode }) {
  return <main className="workspace"><div className="workspace-heading"><div><p className="eyebrow">ONCOSCREEN SHOWCASE</p><h1>{title}</h1><p>{subtitle}</p></div><span className="status"><i /> {statusText}</span></div>{children}</main>;
}

function TechnicianDemo({ submission }: { submission: DemoSubmission | null }) {
  return <Workspace title="Operations workspace" subtitle="Coordinate demonstration submissions without changing review outcomes">
    <div className="metric-row"><Metric value="1" label="Awaiting review"/><Metric value="0" label="Incomplete"/><Metric value="1" label="Today"/></div>
    <section className="table-card"><div className="table-title"><div><h2>Submission queue</h2><p>Fictional records only</p></div><button className="secondary">Export demo list</button></div>
      <div className="table"><div className="table-head"><span>Reference</span><span>Person</span><span>Status</span><span>Submitted</span></div><div className="table-row"><span>SHOWCASE-DEMO-001</span><span><b>Asha Demo</b><small>Fictional profile</small></span><span><em>Awaiting review</em></span><span>{submission ? 'Just now' : '09:31'}</span></div></div>
    </section>
    <div className="info-strip"><Icon>i</Icon><p>Operations users can check completeness and coordinate workflow. This public showcase contains no clinical calculation.</p></div>
  </Workspace>;
}

function ClinicianDemo() {
  const [decision, setDecision] = useState('Not yet recorded');
  return <Workspace title="Professional review" subtitle="Human-controlled demonstration review">
    <div className="review-grid"><section className="table-card"><p className="eyebrow">CASE SUMMARY</p><h2>Asha Demo</h2><dl className="details"><div><dt>Reference</dt><dd>SHOWCASE-DEMO-001</dd></div><div><dt>Record type</dt><dd>Synthetic demonstration</dd></div><div><dt>Status</dt><dd>Awaiting human action</dd></div></dl><h3>Recorded responses</h3><div className="compact-answers"><p>Recent change requested for review <b>Yes</b></p><p>Previously discussed with a professional <b>No</b></p><p>Follow-up support requested <b>Yes</b></p></div></section>
      <section className="decision-card"><p className="eyebrow">HUMAN REVIEW</p><h2>Record a demonstration action</h2><p>No automated clinical recommendation is produced by this repository.</p><button onClick={() => setDecision('Follow-up requested')}>Request follow-up</button><button onClick={() => setDecision('Information requested')}>Request more information</button><div className="decision-result"><small>RECORDED ACTION</small><b>{decision}</b></div></section></div>
  </Workspace>;
}

function Metric({ value, label }: { value: string; label: string }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div>; }

function AuditDemo() {
  return <Workspace title="Audit demonstration" subtitle="Traceable synthetic events">
    <section className="table-card"><div className="table-title"><div><h2>Event history</h2><p>Append-style local demonstration log</p></div><span className="hash">SHOWCASE-DEMO-001</span></div>
      <div className="timeline">{auditEvents.map(([time, event, actor], index) => <div key={event}><span className="timeline-dot">{index + 1}</span><time>{time}</time><p><b>{event}</b><small>{actor}</small></p><code>demo-{String(index + 1).padStart(3, '0')}</code></div>)}</div>
    </section>
    <div className="info-strip"><Icon>✓</Icon><p>This view illustrates traceability concepts only. Refreshing the page resets all interactions.</p></div>
  </Workspace>;
}

function AiRoadmap() {
  const stages = [
    ['1', 'Data foundation', 'Current TRL4', 'Versioned interactions, longitudinal records, human decisions and traceability using synthetic laboratory data.'],
    ['2', 'Model research', 'Planned', 'Use only appropriately governed, de-identified and clinician-confirmed outcome data for locked offline experiments.'],
    ['3', 'Silent evaluation', 'Required', 'Run models without influencing care; assess calibration, fairness, uncertainty and external performance.'],
    ['4', 'Human-supervised assistance', 'Future', 'Show explainable signals to authorised professionals with uncertainty, override and continuous monitoring.'],
  ];
  const capabilities = [
    ['Longitudinal change detection', 'Highlight meaningful changes across repeated interactions for professional review.'],
    ['Data-quality assistance', 'Identify missing, inconsistent or low-confidence information before submission.'],
    ['Multilingual intake support', 'Help structure supported-language responses without providing medical advice.'],
    ['Clinician queue assistance', 'Research prioritisation support while preserving professional control of every decision.'],
    ['Follow-up pathway analytics', 'Identify operational drop-off and access gaps at an aggregate programme level.'],
  ];
  return <Workspace title="Responsible AI roadmap" subtitle="Planned research pathway — no patient-trained model is included in this showcase" statusText="AI roadmap · not deployed">
    <section className="ai-principle"><div><p className="eyebrow">OUR APPROACH</p><h2>Governed data first. AI second. Human decisions always.</h2></div><p>OncoScreen does not claim that synthetic testing proves clinical AI performance. The deterministic workflow provides a transparent safety baseline and creates the traceable feedback structure needed for responsible model development.</p></section>
    <section className="roadmap-list">{stages.map(([number, title, state, body]) => <article key={number}><span>{number}</span><div><small>{state}</small><h3>{title}</h3><p>{body}</p></div></article>)}</section>
    <div className="ai-grid"><section className="table-card"><p className="eyebrow">RESEARCH CAPABILITIES</p><h2>What future AI may assist with</h2><div className="capability-list">{capabilities.map(([title, body]) => <div key={title}><b>{title}</b><p>{body}</p></div>)}</div></section>
      <section className="guardrail-card"><p className="eyebrow">NON-NEGOTIABLE GUARDRAILS</p><h2>What it will not do</h2><ul><li>Autonomously diagnose cancer</li><li>Recommend or prescribe treatment</li><li>Replace examination or imaging</li><li>Use data without appropriate governance</li><li>Present synthetic metrics as clinical accuracy</li><li>Remove professional review or override</li></ul><div><small>CURRENT STATUS</small><b>TRL4 laboratory prototype</b><p>Prospective clinical validation remains a future milestone.</p></div></section></div>
  </Workspace>;
}

export default function App() {
  const [view, setView] = useState<View>('overview');
  const [submission, setSubmission] = useState<DemoSubmission | null>(null);
  const content = useMemo(() => {
    if (view === 'patient') return <PatientDemo onSubmitted={setSubmission}/>;
    if (view === 'technician') return <TechnicianDemo submission={submission}/>;
    if (view === 'clinician') return <ClinicianDemo/>;
    if (view === 'audit') return <AuditDemo/>;
    if (view === 'ai') return <AiRoadmap/>;
    return <Overview begin={() => setView('patient')} openAi={() => setView('ai')}/>;
  }, [view, submission]);
  return <div className="app"><Header view={view} setView={setView}/>{content}<footer><span>OncoScreen public showcase</span><span>All people and records are fictional · Not for clinical use</span></footer></div>;
}
