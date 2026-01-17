import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Cpu,
  Link,
  AlertTriangle,
  ArrowRight,
  X,
} from 'lucide-react';
import { Agent } from '../../data/types';

interface AgentDetailProps {
  agent: Agent | null;
  onClose: () => void;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="glass-card p-6 h-fit sticky top-24"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-electric-500/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-electric-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">
                {agent.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="status-badge status-success text-xs">
                  {agent.status}
                </span>
                <span className="text-xs text-gray-500">
                  {agent.model.includes('sonnet') ? 'Claude Sonnet' : 'Claude Haiku'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-navy-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-6">{agent.description}</p>

        {/* Skills Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-electric-400" />
            Skills & Capabilities
          </h4>
          <div className="space-y-3">
            {agent.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3 bg-navy-700/50 rounded-lg"
              >
                <h5 className="font-medium text-white text-sm">{skill.name}</h5>
                <p className="text-xs text-gray-400 mt-1">{skill.description}</p>
                {skill.exampleInput && (
                  <div className="mt-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="font-medium">Example:</span>
                    </div>
                    <div className="mt-1 p-2 bg-navy-800 rounded text-gray-400">
                      <div className="text-electric-400">Input:</div>
                      <div className="truncate">{skill.exampleInput}</div>
                      {skill.exampleOutput && (
                        <>
                          <div className="text-success-400 mt-1">Output:</div>
                          <div className="truncate">{skill.exampleOutput}</div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MCP Connections */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Link className="w-4 h-4 text-electric-400" />
            MCP Connections
          </h4>
          <div className="space-y-2">
            {agent.mcpConnections.map((conn) => (
              <div
                key={conn.id}
                className="flex items-center justify-between p-2 bg-navy-700/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      conn.status === 'connected'
                        ? 'bg-success-400'
                        : 'bg-danger-400'
                    }`}
                  />
                  <span className="text-sm text-gray-300">{conn.name}</span>
                </div>
                <span className="text-xs text-gray-500">{conn.latencyMs}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* Human Checkpoints */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning-400" />
            Human Checkpoints
          </h4>
          <div className="space-y-2">
            {agent.humanCheckpoints.map((checkpoint, i) => (
              <div
                key={i}
                className="p-3 bg-warning-500/10 border border-warning-500/20 rounded-lg"
              >
                <p className="text-sm text-warning-400 font-medium">
                  {checkpoint.condition}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {checkpoint.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <ArrowRight className="w-3 h-3" />
                  <span>{checkpoint.escalationPath}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white mb-3">
            Performance Metrics
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-navy-700/50 rounded-lg">
              <p className="text-xl font-bold text-white">
                {agent.metrics.tasksCompleted.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Tasks Today</p>
            </div>
            <div className="text-center p-3 bg-navy-700/50 rounded-lg">
              <p className="text-xl font-bold text-electric-400">
                {agent.metrics.avgProcessingTime}s
              </p>
              <p className="text-xs text-gray-500">Avg Time</p>
            </div>
            <div className="text-center p-3 bg-navy-700/50 rounded-lg">
              <p className="text-xl font-bold text-success-400">
                {agent.metrics.accuracyRate}%
              </p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgentDetail;
