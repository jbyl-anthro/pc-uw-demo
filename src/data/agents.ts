import { Agent, MCPConnection } from './types';

export const mcpConnections: MCPConnection[] = [
  {
    id: 'guidewire',
    name: 'Policy Admin (Guidewire)',
    type: 'policy-admin',
    operations: 'read-write',
    latencyMs: 120,
    status: 'connected',
  },
  {
    id: 'duck-creek',
    name: 'Policy Admin (Duck Creek)',
    type: 'policy-admin',
    operations: 'read-write',
    latencyMs: 95,
    status: 'connected',
  },
  {
    id: 'iso-rating',
    name: 'Rating Engine (ISO/AAIS)',
    type: 'rating-engine',
    operations: 'read',
    latencyMs: 45,
    status: 'connected',
  },
  {
    id: 'sharepoint',
    name: 'Document Store (SharePoint)',
    type: 'document-store',
    operations: 'read-write',
    latencyMs: 180,
    status: 'connected',
  },
  {
    id: 's3',
    name: 'Document Store (S3)',
    type: 'document-store',
    operations: 'read-write',
    latencyMs: 35,
    status: 'connected',
  },
  {
    id: 'salesforce',
    name: 'CRM (Salesforce)',
    type: 'crm',
    operations: 'read-write',
    latencyMs: 150,
    status: 'connected',
  },
  {
    id: 'lexisnexis',
    name: 'LexisNexis (MVR, CLUE)',
    type: 'third-party',
    operations: 'read',
    latencyMs: 800,
    status: 'connected',
  },
  {
    id: 'verisk',
    name: 'Verisk (Fire Class, ISO)',
    type: 'third-party',
    operations: 'read',
    latencyMs: 650,
    status: 'connected',
  },
  {
    id: 'corelogic',
    name: 'CoreLogic (Property Data)',
    type: 'third-party',
    operations: 'read',
    latencyMs: 720,
    status: 'connected',
  },
  {
    id: 'serff',
    name: 'State Filing (SERFF)',
    type: 'compliance',
    operations: 'read',
    latencyMs: 250,
    status: 'connected',
  },
  {
    id: 'audit-log',
    name: 'Audit Log System',
    type: 'compliance',
    operations: 'write',
    latencyMs: 15,
    status: 'connected',
  },
];

export const agents: Agent[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator Agent',
    model: 'claude-3-5-sonnet',
    role: 'orchestrator',
    description: 'Coordinates workflow execution, routes submissions, manages state, and handles exceptions across all agent operations.',
    skills: [
      {
        id: 'route-submission',
        name: 'Route Submission',
        description: 'Analyzes incoming submissions and routes to appropriate processing path',
        exampleInput: 'ACORD 80 application with 23 data fields',
        exampleOutput: 'Route to Standard Rating (Risk Score: 72/100)',
      },
      {
        id: 'manage-workflow',
        name: 'Manage Workflow State',
        description: 'Tracks workflow progress and coordinates handoffs between agents',
      },
      {
        id: 'handle-exceptions',
        name: 'Handle Exceptions',
        description: 'Identifies and routes exceptions to appropriate human reviewers',
      },
      {
        id: 'aggregate-results',
        name: 'Aggregate Results',
        description: 'Combines outputs from multiple agents into unified response',
      },
    ],
    mcpConnections: mcpConnections.filter(c =>
      ['guidewire', 'salesforce', 'audit-log'].includes(c.id)
    ),
    humanCheckpoints: [
      {
        condition: 'Risk score below 50',
        description: 'Flag for senior underwriter review',
        escalationPath: 'Senior UW Queue',
      },
      {
        condition: 'Policy premium exceeds $50,000',
        description: 'Require management approval',
        escalationPath: 'Management Review',
      },
    ],
    status: 'active',
    metrics: {
      tasksCompleted: 1247,
      avgProcessingTime: 2.3,
      accuracyRate: 99.8,
    },
  },
  {
    id: 'intake',
    name: 'Intake Agent',
    model: 'claude-3-5-haiku',
    role: 'intake',
    description: 'Processes incoming documents, extracts structured data, validates information, and performs initial risk triage.',
    skills: [
      {
        id: 'doc-extraction',
        name: 'Document Extraction',
        description: 'Extracts structured data from ACORD forms, dec pages, and other insurance documents',
        exampleInput: 'ACORD 80 PDF with handwritten annotations',
        exampleOutput: 'JSON with 23 extracted fields, 98.7% confidence',
      },
      {
        id: 'data-validation',
        name: 'Data Validation',
        description: 'Validates extracted data against business rules and external sources',
      },
      {
        id: 'risk-triage',
        name: 'Risk Triage',
        description: 'Performs initial risk assessment to determine processing path',
      },
      {
        id: 'photo-analysis',
        name: 'Property Photo Analysis',
        description: 'Analyzes property photos to identify risks (roof condition, pool, etc.)',
        exampleInput: '4 property photos',
        exampleOutput: 'Identified: composition roof (good), no pool, detached garage',
      },
    ],
    mcpConnections: mcpConnections.filter(c =>
      ['sharepoint', 's3', 'lexisnexis', 'corelogic', 'verisk', 'audit-log'].includes(c.id)
    ),
    humanCheckpoints: [
      {
        condition: 'Extraction confidence below 85%',
        description: 'Manual verification required',
        escalationPath: 'Data Entry Queue',
      },
      {
        condition: 'Document quality issues',
        description: 'Request clearer documentation',
        escalationPath: 'Agent Outreach',
      },
    ],
    status: 'active',
    metrics: {
      tasksCompleted: 847,
      avgProcessingTime: 47,
      accuracyRate: 98.7,
    },
  },
  {
    id: 'rating',
    name: 'Rating Agent',
    model: 'claude-3-5-sonnet',
    role: 'rating',
    description: 'Calculates premiums, applies rate factors, selects forms, and ensures compliance with state filings.',
    skills: [
      {
        id: 'premium-calc',
        name: 'Premium Calculation',
        description: 'Applies base rates, modifiers, and discounts to calculate final premium',
        exampleInput: 'Risk data with territory, protection class, coverage limits',
        exampleOutput: 'Base: $1,247 -> Modified: $1,184 (5 factors applied)',
      },
      {
        id: 'form-selection',
        name: 'Form Selection',
        description: 'Selects appropriate policy forms based on coverage needs and state requirements',
      },
      {
        id: 'territory-mod',
        name: 'Territory Modification',
        description: 'Applies geographic rating factors based on location',
      },
      {
        id: 'loss-history',
        name: 'Loss History Analysis',
        description: 'Analyzes claims history to determine surcharges or credits',
      },
      {
        id: 'filing-compliance',
        name: 'Filing Compliance',
        description: 'Validates rates against approved state filings',
      },
    ],
    mcpConnections: mcpConnections.filter(c =>
      ['iso-rating', 'serff', 'guidewire', 'audit-log'].includes(c.id)
    ),
    humanCheckpoints: [
      {
        condition: 'Rate deviation exceeds 15%',
        description: 'Underwriter review required',
        escalationPath: 'UW Review Queue',
      },
      {
        condition: 'New territory code',
        description: 'Verify filing approval',
        escalationPath: 'Compliance Review',
      },
    ],
    status: 'active',
    metrics: {
      tasksCompleted: 623,
      avgProcessingTime: 31,
      accuracyRate: 99.94,
    },
  },
  {
    id: 'issuance',
    name: 'Issuance Agent',
    model: 'claude-3-5-haiku',
    role: 'issuance',
    description: 'Generates policy documents, handles eDelivery, performs final compliance checks, and manages policy binding.',
    skills: [
      {
        id: 'doc-generation',
        name: 'Document Generation',
        description: 'Generates quote packages, policy documents, and endorsements',
        exampleInput: 'Rated policy data with forms list',
        exampleOutput: 'Quote package PDF with 12 pages, all disclosures attached',
      },
      {
        id: 'edelivery',
        name: 'eDelivery Management',
        description: 'Handles electronic delivery of documents to agents and insureds',
      },
      {
        id: 'compliance-check',
        name: 'Compliance Check',
        description: 'Performs final compliance verification before issuance',
      },
      {
        id: 'binding',
        name: 'Policy Binding',
        description: 'Executes policy binding and updates policy admin system',
      },
    ],
    mcpConnections: mcpConnections.filter(c =>
      ['guidewire', 'duck-creek', 's3', 'salesforce', 'audit-log'].includes(c.id)
    ),
    humanCheckpoints: [
      {
        condition: 'Premium exceeds authority',
        description: 'Management approval for binding',
        escalationPath: 'Management Queue',
      },
    ],
    status: 'active',
    metrics: {
      tasksCompleted: 412,
      avgProcessingTime: 5,
      accuracyRate: 100,
    },
  },
  {
    id: 'audit',
    name: 'Audit Agent',
    model: 'claude-3-5-haiku',
    role: 'audit',
    description: 'Maintains comprehensive audit trails, generates compliance reports, and monitors for regulatory adherence.',
    skills: [
      {
        id: 'trace-logging',
        name: 'Trace Logging',
        description: 'Records all agent actions with full context for audit trails',
        exampleInput: 'Agent action with timestamp and data accessed',
        exampleOutput: 'Immutable log entry with decision rationale',
      },
      {
        id: 'report-generation',
        name: 'Report Generation',
        description: 'Generates examiner-ready compliance reports',
      },
      {
        id: 'monitoring',
        name: 'Compliance Monitoring',
        description: 'Real-time monitoring for compliance violations',
      },
    ],
    mcpConnections: mcpConnections.filter(c =>
      ['audit-log', 'serff'].includes(c.id)
    ),
    humanCheckpoints: [
      {
        condition: 'Compliance violation detected',
        description: 'Immediate escalation to compliance officer',
        escalationPath: 'Compliance Officer',
      },
    ],
    status: 'active',
    metrics: {
      tasksCompleted: 8470,
      avgProcessingTime: 0.5,
      accuracyRate: 100,
    },
  },
];

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};
