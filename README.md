# P&C Insurance Underwriting Operations - Agentic AI Demo

An interactive, executive-ready web demonstration showcasing how agentic AI transforms underwriting operations for P&C (Property & Casualty) insurance carriers.

## Overview

This demo targets C-suite executives (CUO, COO, CTO, CFO) at carriers writing personal lines - homeowners, auto, and personal casualty insurance. It demonstrates what's viable TODAY with Claude-powered agents, showing real workflows, real system integrations, and real compliance/auditability features.

## Features

### 1. Executive Dashboard
Real-time operations command center showing:
- Submissions processing metrics
- Quote generation statistics
- Policy binding rates
- Endorsement backlog tracking
- Compliance scores
- Agent activity feed

### 2. Agent Architecture Visualization
Interactive diagram showing the multi-agent system:
- **Orchestrator Agent** (Claude Sonnet) - Routes submissions, manages workflow state
- **Intake Agent** (Claude Haiku) - Document extraction, data validation, risk triage
- **Rating Agent** (Claude Sonnet) - Premium calculation, form selection, compliance
- **Issuance Agent** (Claude Haiku) - Document generation, eDelivery, policy binding
- **Audit Agent** (Claude Haiku) - Trace logging, compliance monitoring

### 3. Live Workflow Simulation
Three interactive workflow demos:
- **Homeowners New Business** - Full submission to quote workflow
- **Auto Add Driver Endorsement** - MTA with human checkpoint
- **Umbrella Policy Renewal** - Proactive coverage recommendations

### 4. Document Intelligence Engine
Demonstrates Claude's document processing capabilities:
- ACORD form extraction (98.7% accuracy)
- Prior carrier dec page parsing
- Property photo analysis
- MVR and CLUE report processing

### 5. Audit & Compliance Dashboard
Regulatory compliance features:
- Complete audit trail for every decision
- Decision explainability (click to see reasoning)
- State filing compliance verification
- Examiner-ready report generation
- Executive FAQ with talking points

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Zustand** for state management
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pc-uw-demo.git
cd pc-uw-demo

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

Or push to main/master branch and GitHub Actions will automatically deploy.

## Project Structure

```
src/
├── components/
│   ├── dashboard/      # Executive dashboard components
│   ├── agents/         # Agent architecture visualization
│   ├── workflows/      # Workflow simulator
│   ├── documents/      # Document intelligence demo
│   └── compliance/     # Audit trail & compliance
├── data/
│   ├── types.ts        # TypeScript interfaces
│   ├── agents.ts       # Agent configurations
│   ├── workflows.ts    # Workflow definitions
│   ├── auditLogs.ts    # Sample audit data
│   └── talkingPoints.ts # Executive FAQ content
├── store/
│   └── demoStore.ts    # Zustand state management
├── hooks/
│   └── useWorkflowSimulation.ts
├── App.tsx
└── index.css           # Tailwind styles
```

## Key Design Decisions

1. **Realistic Timing** - All durations based on actual agent performance
2. **Human Checkpoints** - Clearly shows where humans remain in the loop
3. **Compliance First** - Audit trail is a core feature, not an afterthought
4. **P&C Specific** - Uses real insurance terminology (ACORD, MVR, CLUE, etc.)
5. **Measurable Outcomes** - Every metric ties to business value

## What This Demo Does NOT Include

For transparency, these are simulated:
- Real-time API integrations (pre-loaded data)
- Actual document upload/processing (example documents)
- Full policy admin system integration (mock responses)
- Production-scale performance testing

## License

MIT
