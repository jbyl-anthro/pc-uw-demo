import { TalkingPoint } from './types';

export const talkingPoints: TalkingPoint[] = [
  {
    id: 'accuracy',
    title: 'Agent Accuracy',
    question: 'How accurate are the agents?',
    content: `Document extraction achieves 96-99% accuracy depending on document quality. Every extraction is logged with confidence scores. Low-confidence extractions (below 85%) automatically escalate to human review. Rating calculations are verified against approved state filings with 99.94% accuracy. The remaining 0.06% are caught by compliance checks before issuance.`,
  },
  {
    id: 'errors',
    title: 'Error Handling',
    question: 'What happens when the agent is wrong?',
    content: `Human checkpoints are built into high-stakes decisions. When confidence is below 90%, the system escalates with full context to a human reviewer. All overrides are logged with rationale for continuous improvement. The agent learns from corrections to reduce similar errors. Exception paths are clearly defined for each workflow type.`,
  },
  {
    id: 'regulators',
    title: 'Regulatory Compliance',
    question: 'How do we explain this to regulators?',
    content: `Every decision has a complete audit trail: data accessed, reasoning applied, rules followed. State filing compliance is verified automatically against SERFF. Examiner-ready reports generate with one click. Rate deviations are flagged and documented. Human oversight points are maintained for all underwriting decisions. The system is designed to exceed market conduct exam requirements.`,
  },
  {
    id: 'roi',
    title: 'Return on Investment',
    question: "What's the ROI?",
    content: `Typical results based on deployments: 70% reduction in quote turnaround time (from 48 hours to under 15 minutes for standard risks), 40% increase in straight-through processing rate, 60% reduction in data entry errors, 50% reduction in endorsement backlog. Most carriers see positive ROI within 6 months of deployment. Underwriters can focus on complex risks that actually need human judgment.`,
  },
  {
    id: 'dataSafety',
    title: 'Data Security',
    question: 'Is our data safe?',
    content: `Claude does not train on your data - this is a contractual guarantee. All processing occurs in SOC 2 Type II certified environments. Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Full audit logs track all data access. No PII is retained after processing unless explicitly stored in your systems. Integration follows zero-trust security principles.`,
  },
  {
    id: 'scalability',
    title: 'Scalability',
    question: 'Can this scale?',
    content: `The architecture supports horizontal scaling with no practical limit. Current deployments process thousands of concurrent submissions during peak periods (month-end renewals, catastrophe response). Response times remain consistent regardless of volume. Agent capacity automatically scales based on demand. No degradation in accuracy or compliance checking under load.`,
  },
  {
    id: 'integration',
    title: 'System Integration',
    question: 'How does this integrate with our existing systems?',
    content: `The MCP (Model Context Protocol) provides standardized connectors for major policy admin systems (Guidewire, Duck Creek, Majesco), rating engines (ISO, AAIS), CRMs (Salesforce, Applied Epic), and document management. APIs support REST and event-driven architectures. Typical integration timeline is 8-12 weeks. No changes required to existing systems - the agent layer sits on top.`,
  },
  {
    id: 'humanloop',
    title: 'Human Oversight',
    question: 'Do we still need underwriters?',
    content: `Absolutely. Agents handle routine processing so underwriters can focus on what they do best: complex risk evaluation, relationship management, and exception handling. The goal is augmentation, not replacement. Underwriters review agent recommendations, handle escalations, and make final decisions on complex risks. Their expertise trains the system to handle edge cases better over time.`,
  },
];

export const getTalkingPointById = (id: string): TalkingPoint | undefined => {
  return talkingPoints.find(tp => tp.id === id);
};
