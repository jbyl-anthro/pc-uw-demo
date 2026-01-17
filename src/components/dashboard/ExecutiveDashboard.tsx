import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, Clock } from 'lucide-react';
import MetricCard, { PerformanceMetricsPanel } from './MetricsPanel';
import AgentActivityFeed from './AgentActivityFeed';
import { useDemoStore } from '../../store/demoStore';

const ExecutiveDashboard: React.FC = () => {
  const { metrics, updateMetrics } = useDemoStore();

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  const metricCards = [
    {
      label: 'Submissions Processing',
      value: metrics.submissionsProcessing,
      change: 34,
      trend: 'up' as const,
      period: 'vs. manual baseline',
      icon: Zap,
    },
    {
      label: 'Quotes Generated',
      value: metrics.quotesGenerated,
      change: 28,
      trend: 'up' as const,
      period: 'vs. manual baseline',
      icon: TrendingUp,
    },
    {
      label: 'Policies Bound',
      value: metrics.policiesBound,
      change: 41,
      trend: 'up' as const,
      period: 'vs. manual baseline',
      icon: Shield,
    },
    {
      label: 'Endorsement Backlog',
      value: metrics.endorsementBacklog,
      change: 52,
      trend: 'down' as const,
      period: 'reduction',
      icon: Clock,
    },
  ];

  const performanceMetrics = [
    {
      label: 'Avg. Quote Time',
      value: `${metrics.avgQuoteTime} min`,
      target: '< 15 min',
      status: 'good' as const,
    },
    {
      label: 'Straight-Through Rate',
      value: `${metrics.straightThroughRate}%`,
      target: '> 60%',
      status: 'good' as const,
    },
    {
      label: 'Human Touch Time',
      value: `${metrics.humanTouchTime} min`,
      target: '< 5 min',
      status: 'good' as const,
    },
    {
      label: 'Agent Accuracy',
      value: `${metrics.agentAccuracy}%`,
      target: '> 98%',
      status: 'good' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Operations Intelligence Center
          </h2>
          <p className="text-gray-400 mt-1">
            Real-time visibility into agent-powered underwriting operations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Compliance Score</p>
            <p className="text-2xl font-bold text-success-400">
              {metrics.complianceScore}%
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full border-4 border-success-500/30 flex items-center justify-center bg-success-500/10"
          >
            <Shield className="w-8 h-8 text-success-400" />
          </motion.div>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, i) => (
          <MetricCard key={metric.label} {...metric} index={i} />
        ))}
      </div>

      {/* Secondary Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-1">
          <PerformanceMetricsPanel performanceMetrics={performanceMetrics} />
        </div>

        {/* Agent Activity Feed */}
        <div className="lg:col-span-2">
          <AgentActivityFeed />
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-4 text-center"
        >
          <p className="text-2xl font-bold text-electric-400">5</p>
          <p className="text-sm text-gray-400">Active Agents</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-4 text-center"
        >
          <p className="text-2xl font-bold text-success-400">11</p>
          <p className="text-sm text-gray-400">MCP Connections</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-4 text-center"
        >
          <p className="text-2xl font-bold text-warning-400">3</p>
          <p className="text-sm text-gray-400">Pending Reviews</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-4 text-center"
        >
          <p className="text-2xl font-bold text-white">50</p>
          <p className="text-sm text-gray-400">States Covered</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
