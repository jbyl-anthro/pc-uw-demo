import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ChevronRight } from 'lucide-react';
import { Agent } from '../../data/types';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  isSelected,
  onClick,
  compact = false,
}) => {
  const getModelBadge = (model: string) => {
    if (model.includes('sonnet')) {
      return (
        <span className="status-badge bg-purple-500/20 text-purple-400 border-purple-500/30">
          Sonnet
        </span>
      );
    }
    return (
      <span className="status-badge bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
        Haiku
      </span>
    );
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`p-4 rounded-xl border cursor-pointer transition-all ${
          isSelected
            ? 'bg-electric-500/20 border-electric-500/50'
            : 'bg-navy-700/50 border-white/10 hover:border-electric-500/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            agent.status === 'active' ? 'bg-success-500/20' : 'bg-navy-600'
          }`}>
            <Bot className={`w-5 h-5 ${
              agent.status === 'active' ? 'text-success-400' : 'text-gray-400'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white truncate">{agent.name}</h4>
            <p className="text-xs text-gray-400">{agent.skills.length} skills</p>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${
            isSelected ? 'text-electric-400 rotate-90' : 'text-gray-500'
          }`} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`glass-card p-6 cursor-pointer transition-all ${
        isSelected ? 'border-electric-500/50 shadow-lg shadow-electric-500/10' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              agent.status === 'active'
                ? 'bg-success-500/20 animate-pulse-slow'
                : 'bg-navy-600'
            }`}
          >
            <Bot
              className={`w-6 h-6 ${
                agent.status === 'active' ? 'text-success-400' : 'text-gray-400'
              }`}
            />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white">{agent.name}</h3>
            <p className="text-sm text-gray-400 capitalize">{agent.role}</p>
          </div>
        </div>
        {getModelBadge(agent.model)}
      </div>

      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{agent.description}</p>

      {/* Skills Preview */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {agent.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="px-2 py-1 bg-navy-700 rounded text-xs text-gray-300"
            >
              {skill.name}
            </span>
          ))}
          {agent.skills.length > 3 && (
            <span className="px-2 py-1 bg-navy-700 rounded text-xs text-gray-500">
              +{agent.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-lg font-semibold text-white">
            {agent.metrics.tasksCompleted.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-electric-400">
            {agent.metrics.avgProcessingTime}s
          </p>
          <p className="text-xs text-gray-500">Avg Time</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-success-400">
            {agent.metrics.accuracyRate}%
          </p>
          <p className="text-xs text-gray-500">Accuracy</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
