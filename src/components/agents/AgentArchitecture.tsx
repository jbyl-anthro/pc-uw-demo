import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  Database,
  Eye,
  Code,
} from 'lucide-react';
import { agents, mcpConnections } from '../../data/agents';
import AgentCard from './AgentCard';
import AgentDetail from './AgentDetail';
import { Agent } from '../../data/types';

const AgentArchitecture: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'technical'>('simple');

  const orchestrator = agents.find((a) => a.role === 'orchestrator');
  const workerAgents = agents.filter((a) => a.role !== 'orchestrator');

  const groupedConnections = {
    'Policy Admin': mcpConnections.filter((c) => c.type === 'policy-admin'),
    'Rating Engine': mcpConnections.filter((c) => c.type === 'rating-engine'),
    'Document Store': mcpConnections.filter((c) => c.type === 'document-store'),
    'Third-Party Data': mcpConnections.filter((c) => c.type === 'third-party'),
    'Compliance': mcpConnections.filter((c) => c.type === 'compliance'),
    'CRM': mcpConnections.filter((c) => c.type === 'crm'),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Multi-Agent Architecture
          </h2>
          <p className="text-gray-400 mt-1">
            Explore how specialized agents work together to process underwriting
            workflows
          </p>
        </div>
        <div className="flex items-center gap-2 bg-navy-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('simple')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              viewMode === 'simple'
                ? 'bg-electric-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            Simple View
          </button>
          <button
            onClick={() => setViewMode('technical')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              viewMode === 'technical'
                ? 'bg-electric-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            Technical View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Architecture Diagram */}
        <div className={`${selectedAgent ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {/* Orchestrator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            {orchestrator && (
              <div
                onClick={() => setSelectedAgent(orchestrator)}
                className={`glass-card p-6 cursor-pointer transition-all mx-auto max-w-xl ${
                  selectedAgent?.id === orchestrator.id
                    ? 'border-electric-500/50 shadow-lg shadow-electric-500/10'
                    : 'hover:border-electric-500/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-500 to-purple-600 flex items-center justify-center">
                    <Network className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-white text-lg">
                        {orchestrator.name}
                      </h3>
                      <span className="status-badge bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                        Sonnet
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Routes submissions, manages workflow state, handles exceptions
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Connection Lines */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="w-0.5 h-12 bg-gradient-to-b from-electric-500/50 to-electric-500/20"
                />
              ))}
            </div>
          </div>

          {/* Worker Agents */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {workerAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <AgentCard
                  agent={agent}
                  isSelected={selectedAgent?.id === agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  compact
                />
              </motion.div>
            ))}
          </div>

          {/* MCP Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-electric-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-electric-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white">
                  MCP (Model Context Protocol)
                </h3>
                <p className="text-sm text-gray-400">
                  Standardized tool integrations for agent operations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(groupedConnections).map(([category, connections]) => (
                <div key={category} className="p-3 bg-navy-700/50 rounded-lg">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {connections.map((conn) => (
                      <div
                        key={conn.id}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            conn.status === 'connected'
                              ? 'bg-success-400'
                              : 'bg-danger-400'
                          }`}
                        />
                        <span className="text-gray-300 truncate" title={conn.name}>
                          {conn.name.split('(')[0].trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {viewMode === 'technical' && (
              <div className="mt-6 p-4 bg-navy-900/50 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Technical Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-500">Protocol</p>
                    <p className="text-gray-300">MCP v1.0 (JSON-RPC)</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Authentication</p>
                    <p className="text-gray-300">OAuth 2.0 / API Keys</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Transport</p>
                    <p className="text-gray-300">HTTPS / WebSocket</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Retry Policy</p>
                    <p className="text-gray-300">Exponential backoff (3x)</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Agent Detail Panel */}
        {selectedAgent && (
          <div className="lg:col-span-1">
            <AgentDetail
              agent={selectedAgent}
              onClose={() => setSelectedAgent(null)}
            />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500/40" />
          <span>Claude Sonnet (Complex reasoning)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-cyan-500/40" />
          <span>Claude Haiku (Fast processing)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success-400" />
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
};

export default AgentArchitecture;
