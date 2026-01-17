import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  User,
  Bot,
  Home,
  Car,
  Umbrella,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { useWorkflowSimulation } from '../../hooks/useWorkflowSimulation';
import { WorkflowType } from '../../data/types';

const workflowIcons: Record<WorkflowType, React.ReactNode> = {
  'homeowners-nb': <Home className="w-4 h-4" />,
  'auto-endorsement': <Car className="w-4 h-4" />,
  'umbrella-renewal': <Umbrella className="w-4 h-4" />,
};

const WorkflowSimulator: React.FC = () => {
  const { selectedWorkflow, setSelectedWorkflow } = useDemoStore();
  const {
    workflow,
    isRunning,
    currentStep,
    completedSteps,
    totalTime,
    humanTime,
    automationTime,
    runSimulation,
    pauseSimulation,
    reset,
  } = useWorkflowSimulation();

  const workflowOptions: { id: WorkflowType; name: string }[] = [
    { id: 'homeowners-nb', name: 'Homeowners New Business' },
    { id: 'auto-endorsement', name: 'Auto Add Driver' },
    { id: 'umbrella-renewal', name: 'Umbrella Renewal' },
  ];

  if (!workflow) return null;

  return (
    <div className="space-y-8">
      {/* Header with workflow selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Live Workflow Simulation
          </h2>
          <p className="text-gray-400 mt-1">
            Watch agents process real insurance workflows in real-time
          </p>
        </div>
        <div className="flex gap-2">
          {workflowOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedWorkflow(option.id);
                reset();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedWorkflow === option.id
                  ? 'bg-electric-500 text-white'
                  : 'bg-navy-700 text-gray-400 hover:text-white hover:bg-navy-600'
              }`}
            >
              {workflowIcons[option.id]}
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls and Timeline */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              {workflow.name}
            </h3>
            <p className="text-gray-400 text-sm">{workflow.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Total Time</p>
              <p className="text-lg font-semibold text-white">{totalTime} sec</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Automation</p>
              <p className="text-lg font-semibold text-success-400">
                {automationTime} sec
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Human Touch</p>
              <p className="text-lg font-semibold text-warning-400">
                {humanTime} sec
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={isRunning ? pauseSimulation : runSimulation}
                className="btn-primary"
              >
                {isRunning ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isRunning ? 'Pause' : 'Run Simulation'}
              </button>
              <button onClick={reset} className="btn-secondary">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-500 to-success-500"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((completedSteps.length) / workflow.steps.length) * 100
                }%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Start</span>
            <span>
              {completedSteps.length} of {workflow.steps.length} steps complete
            </span>
            <span>End</span>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-4">
          {workflow.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === index;

            return (
              <motion.div
                key={step.id}
                animate={{
                  opacity: currentStep >= index || completedSteps.includes(step.id) ? 1 : 0.5,
                  scale: isCurrent ? 1.01 : 1,
                }}
                className={`p-4 rounded-lg border transition-all ${
                  isCompleted
                    ? 'bg-success-500/10 border-success-500/30'
                    : isCurrent
                    ? 'bg-electric-500/10 border-electric-500/30'
                    : 'bg-navy-700/50 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-success-500/20'
                          : isCurrent
                          ? 'bg-electric-500/20'
                          : 'bg-navy-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-success-400" />
                      ) : step.isHuman ? (
                        <User className="w-5 h-5 text-warning-400" />
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Bot className="w-5 h-5 text-electric-400" />
                        </motion.div>
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">{step.name}</h4>
                        {step.isHuman && (
                          <span className="status-badge status-warning text-xs">
                            Human Checkpoint
                          </span>
                        )}
                        {isCurrent && !isCompleted && (
                          <span className="status-badge status-processing text-xs">
                            Processing
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{step.agent}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{step.duration} sec</p>
                  </div>
                </div>

                <AnimatePresence>
                  {(isCurrent || isCompleted) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pl-14 overflow-hidden"
                    >
                      <div className="space-y-1">
                        {step.actions.map((action, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{action}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-navy-800 rounded border border-electric-500/30">
                        <p className="text-sm">
                          <span className="text-electric-400 font-medium">
                            Output:
                          </span>{' '}
                          <span className="text-gray-300">{step.output}</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Summary */}
        <AnimatePresence>
          {completedSteps.length === workflow.steps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-success-500/10 border border-success-500/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Workflow Complete
                  </h4>
                  <p className="text-sm text-gray-400">
                    Total processing time: {totalTime} seconds | Human touch time:{' '}
                    {humanTime} seconds ({Math.round((humanTime / totalTime) * 100)}%)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkflowSimulator;
