import { useCallback, useRef } from 'react';
import { useDemoStore } from '../store/demoStore';
import { workflows } from '../data/workflows';

export const useWorkflowSimulation = () => {
  const {
    selectedWorkflow,
    isSimulationRunning,
    setSimulationRunning,
    currentStep,
    setCurrentStep,
    completedSteps,
    addCompletedStep,
    resetSimulation,
  } = useDemoStore();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const workflow = workflows[selectedWorkflow];

  const runSimulation = useCallback(async () => {
    if (!workflow) return;

    setSimulationRunning(true);
    resetSimulation();

    for (let i = 0; i < workflow.steps.length; i++) {
      setCurrentStep(i);

      // Wait for the step duration (scaled for demo)
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(
          resolve,
          workflow.steps[i].duration * 50 // 50ms per second of real time
        );
      });

      addCompletedStep(workflow.steps[i].id);
    }

    setSimulationRunning(false);
  }, [workflow, setSimulationRunning, resetSimulation, setCurrentStep, addCompletedStep]);

  const pauseSimulation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSimulationRunning(false);
  }, [setSimulationRunning]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    resetSimulation();
  }, [resetSimulation]);

  const totalTime = workflow?.steps.reduce((acc, step) => acc + step.duration, 0) || 0;
  const humanTime = workflow?.steps
    .filter((s) => s.isHuman)
    .reduce((acc, step) => acc + step.duration, 0) || 0;
  const automationTime = totalTime - humanTime;

  return {
    workflow,
    isRunning: isSimulationRunning,
    currentStep,
    completedSteps,
    totalTime,
    humanTime,
    automationTime,
    runSimulation,
    pauseSimulation,
    reset,
  };
};
