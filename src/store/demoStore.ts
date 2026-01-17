import { create } from 'zustand';
import { WorkflowType, DashboardMetrics } from '../data/types';

type Section = 'dashboard' | 'architecture' | 'workflows' | 'compliance' | 'documents';

interface DemoState {
  // Navigation
  activeSection: Section;
  setActiveSection: (section: Section) => void;

  // Workflow Simulation
  selectedWorkflow: WorkflowType;
  setSelectedWorkflow: (workflow: WorkflowType) => void;
  isSimulationRunning: boolean;
  setSimulationRunning: (running: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: string[];
  addCompletedStep: (stepId: string) => void;
  resetSimulation: () => void;

  // Agent View
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  viewMode: 'simple' | 'technical';
  setViewMode: (mode: 'simple' | 'technical') => void;

  // Audit Trail
  selectedPolicyNumber: string;
  setSelectedPolicyNumber: (policyNumber: string) => void;
  auditFilter: string;
  setAuditFilter: (filter: string) => void;

  // Metrics (simulated real-time updates)
  metrics: DashboardMetrics;
  updateMetrics: () => void;

  // Document Demo
  isExtracting: boolean;
  setIsExtracting: (extracting: boolean) => void;
  extractionProgress: number;
  setExtractionProgress: (progress: number) => void;
}

const initialMetrics: DashboardMetrics = {
  submissionsProcessing: 847,
  quotesGenerated: 623,
  policiesBound: 412,
  endorsementBacklog: 156,
  complianceScore: 99.7,
  avgQuoteTime: 4.2,
  straightThroughRate: 73,
  humanTouchTime: 2.1,
  agentAccuracy: 99.2,
};

export const useDemoStore = create<DemoState>((set) => ({
  // Navigation
  activeSection: 'dashboard',
  setActiveSection: (section) => set({ activeSection: section }),

  // Workflow Simulation
  selectedWorkflow: 'homeowners-nb',
  setSelectedWorkflow: (workflow) =>
    set({
      selectedWorkflow: workflow,
      currentStep: -1,
      completedSteps: [],
      isSimulationRunning: false,
    }),
  isSimulationRunning: false,
  setSimulationRunning: (running) => set({ isSimulationRunning: running }),
  currentStep: -1,
  setCurrentStep: (step) => set({ currentStep: step }),
  completedSteps: [],
  addCompletedStep: (stepId) =>
    set((state) => ({
      completedSteps: [...state.completedSteps, stepId],
    })),
  resetSimulation: () =>
    set({
      currentStep: -1,
      completedSteps: [],
      isSimulationRunning: false,
    }),

  // Agent View
  selectedAgentId: null,
  setSelectedAgentId: (id) => set({ selectedAgentId: id }),
  viewMode: 'simple',
  setViewMode: (mode) => set({ viewMode: mode }),

  // Audit Trail
  selectedPolicyNumber: 'HO-2026-001847',
  setSelectedPolicyNumber: (policyNumber) =>
    set({ selectedPolicyNumber: policyNumber }),
  auditFilter: '',
  setAuditFilter: (filter) => set({ auditFilter: filter }),

  // Metrics
  metrics: initialMetrics,
  updateMetrics: () =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        submissionsProcessing:
          state.metrics.submissionsProcessing + Math.floor(Math.random() * 3),
        quotesGenerated:
          state.metrics.quotesGenerated + Math.floor(Math.random() * 2),
        policiesBound:
          state.metrics.policiesBound + Math.floor(Math.random() * 2),
        endorsementBacklog: Math.max(
          0,
          state.metrics.endorsementBacklog - Math.floor(Math.random() * 2)
        ),
      },
    })),

  // Document Demo
  isExtracting: false,
  setIsExtracting: (extracting) => set({ isExtracting: extracting }),
  extractionProgress: 0,
  setExtractionProgress: (progress) => set({ extractionProgress: progress }),
}));
