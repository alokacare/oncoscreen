# Public showcase architecture

## Purpose

The public application demonstrates the boundaries between four user experiences while remaining fully local and non-clinical.

```text
Patient walkthrough
        │
        ▼
In-browser mock adapter ──► Synthetic receipt
        │
        ├──► Operations queue
        ├──► Professional review interaction
        └──► Demonstration audit history
```

## Runtime

- React renders all interfaces.
- The mock adapter waits briefly and returns a fixed fictional receipt.
- No remote API, analytics service, authentication provider or database is contacted.
- Refreshing the browser resets the demonstration.

## Deliberate exclusions

The package has no medical algorithm, score, threshold, real questionnaire, provider integration, production identity system or clinical database. Those exclusions are architectural boundaries rather than unfinished public features.

## Production concept

A future authorised system would place sensitive functions behind an authenticated service boundary and maintain strict separation between patient-facing status, authorised operational access and professional clinical review. That production architecture is not implemented here.

## Responsible AI research path

AI is a staged research direction, not a hidden feature of this public repository.

```text
Governed longitudinal records
        │
        ▼
Clinician-confirmed outcomes
        │
        ▼
Locked offline model research
        │
        ▼
External and silent-mode evaluation
        │
        ▼
Explainable human-supervised assistance
```

Each transition requires documented data rights, representative datasets, versioned evidence, safety and fairness evaluation, professional oversight and an explicit go/no-go decision. No autonomous diagnosis or treatment decision belongs in this architecture.
