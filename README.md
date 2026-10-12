# OncoScreen by Aloka Care

OncoScreen is a clinician-led digital breast-health navigation platform. It connects an accessible patient check-in, assisted operations, professional review and longitudinal records so that people can move from first concern to appropriate follow-up through a traceable pathway.

This repository is the deliberately limited public hackathon showcase. It communicates the product and responsible-AI direction without publishing proprietary clinical content, private infrastructure or real health data.

## Startup snapshot

| Area | Position |
| --- | --- |
| Problem | Access is fragmented between awareness, first contact, screening coordination and professional follow-up. |
| Solution | A structured digital front door joining patient intake, assisted screening, human review and longitudinal evidence. |
| Customers | Hospitals, screening programmes, employers, public-health partners and community organisations. |
| Model | B2B and B2B2C annual licences, per-assessment plans, white-label deployments and implementation support. |
| Current maturity | TRL4 laboratory prototype; prospective clinical validation remains future work. |

## What is implemented here

- Responsive fictional patient walkthrough
- Operations queue for a synthetic submission
- Human-controlled professional review interaction
- Synthetic audit-event viewer
- Responsible-AI research roadmap
- Non-clinical mock API contract and fictional payload
- Automated public-release and secret-leak checks
- Sanitised screenshots and short demonstration video

## Responsible AI direction

The current platform is a governed data and workflow foundation, not a deployed clinical AI model. The roadmap is intentionally staged:

1. Capture versioned, longitudinal interactions and separately recorded human decisions.
2. With appropriate consent and governance, build de-identified, clinician-confirmed research datasets.
3. Evaluate locked models offline and then in silent mode for calibration, fairness, uncertainty and external performance.
4. Consider explainable, human-supervised assistance only after validation and governance gates are met.

Potential research areas include longitudinal change detection, data-quality checks, multilingual intake support, clinician queue assistance and aggregate follow-up analytics. AI must not autonomously diagnose cancer, prescribe treatment, replace examination or imaging, or remove professional review.

## Evidence and claims boundary

The private laboratory prototype has been computationally verified on 50,000 synthetic records with zero mapping, schema, routing and scoring-invariant failures. This supports engineering verification only. It is not evidence of clinical accuracy, sensitivity, specificity, safety or effectiveness.

This public package itself contains no clinical scoring, thresholds, real questionnaire, diagnostic logic, medical recommendation engine, patient-trained model or production backend. All people, identifiers, responses and events are fictional; nothing is stored or sent externally.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4179`.

## Verify before publishing

```bash
npm test
npm run build
```

`npm test` validates the fictional sample data and runs the public-release safety audit. The audit rejects credentials, environment files, source maps, symbolic links, parent-project imports and prohibited private artifact names.

## Repository map

```text
src/                 Standalone public user interface
api/openapi.yaml     Non-clinical mock API contract
sample-data/         Fictional payloads only
docs/                Architecture and public/private scope boundary
public/media/        Sanitised screenshots and demo video
scripts/             Media capture and public-safety audit
tests/               Public-package regression tests
```

## Evaluation notes

Evaluate this repository for product thinking, workflow design, responsible-AI planning, user experience and traceability. Proprietary clinical materials and operational infrastructure are intentionally outside its scope. See [architecture](docs/architecture.md) and the [intellectual-property boundary](docs/intellectual-property-boundary.md).

## Licence

Copyright © 2026 Aloka Care. All rights reserved. See [LICENSE](LICENSE).
