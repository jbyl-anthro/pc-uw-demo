// Agent types and schemas
export interface Agent {
  id: string;
  name: string;
  model: 'claude-3-5-sonnet' | 'claude-3-5-haiku';
  role: 'orchestrator' | 'intake' | 'rating' | 'issuance' | 'audit';
  description: string;
  skills: Skill[];
  mcpConnections: MCPConnection[];
  humanCheckpoints: HumanCheckpoint[];
  status: 'idle' | 'active' | 'processing';
  metrics: AgentMetrics;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  exampleInput?: string;
  exampleOutput?: string;
}

export interface MCPConnection {
  id: string;
  name: string;
  type: 'policy-admin' | 'rating-engine' | 'document-store' | 'third-party' | 'compliance' | 'crm';
  operations: 'read' | 'write' | 'read-write';
  latencyMs: number;
  status: 'connected' | 'disconnected';
}

export interface HumanCheckpoint {
  condition: string;
  description: string;
  escalationPath: string;
}

export interface AgentMetrics {
  tasksCompleted: number;
  avgProcessingTime: number;
  accuracyRate: number;
}

// Workflow types
export type WorkflowType = 'homeowners-nb' | 'auto-endorsement' | 'umbrella-renewal';
export type StepStatus = 'pending' | 'in-progress' | 'completed' | 'needs-review' | 'error';

export interface WorkflowStep {
  id: string;
  name: string;
  agent: string;
  duration: number;
  isHuman?: boolean;
  actions: string[];
  output: string;
}

export interface Workflow {
  id: WorkflowType;
  name: string;
  description: string;
  lineOfBusiness: 'homeowners' | 'auto' | 'umbrella';
  steps: WorkflowStep[];
}

// Audit types
export interface AuditEntry {
  timestamp: Date;
  agentId: string;
  agentName: string;
  action: string;
  details: string;
  dataAccessed: string[];
  decisionRationale?: string;
  policyNumber?: string;
}

// Document types
export interface DocumentType {
  id: string;
  name: string;
  extractionAccuracy: number;
  avgProcessingTime: number;
  fieldsExtracted: number;
}

// Metrics types
export interface DashboardMetrics {
  submissionsProcessing: number;
  quotesGenerated: number;
  policiesBound: number;
  endorsementBacklog: number;
  complianceScore: number;
  avgQuoteTime: number;
  straightThroughRate: number;
  humanTouchTime: number;
  agentAccuracy: number;
}

// Executive talking points
export interface TalkingPoint {
  id: string;
  title: string;
  question: string;
  content: string;
}
