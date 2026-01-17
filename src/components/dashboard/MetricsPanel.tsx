import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down';
  period?: string;
  icon: LucideIcon;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  trend,
  period,
  icon: Icon,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="metric-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div
          className={`p-2 rounded-lg ${
            trend === 'up' ? 'bg-success-500/20' : 'bg-electric-500/20'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              trend === 'up' ? 'text-success-400' : 'text-electric-400'
            }`}
          />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-2 mt-4">
          <span
            className={`text-sm font-medium ${
              trend === 'up' ? 'text-success-400' : 'text-electric-400'
            }`}
          >
            {trend === 'up' ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500">{period}</span>
        </div>
      )}
    </motion.div>
  );
};

interface PerformanceMetric {
  label: string;
  value: string;
  target: string;
  status: 'good' | 'warning' | 'bad';
}

interface MetricsPanelProps {
  performanceMetrics: PerformanceMetric[];
}

export const PerformanceMetricsPanel: React.FC<MetricsPanelProps> = ({
  performanceMetrics,
}) => {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-white mb-4">
        Performance Targets
      </h3>
      <div className="space-y-4">
        {performanceMetrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-400">{metric.label}</p>
              <p className="text-lg font-semibold text-white">{metric.value}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Target: {metric.target}</p>
              <span
                className={`status-badge text-xs ${
                  metric.status === 'good'
                    ? 'status-success'
                    : metric.status === 'warning'
                    ? 'status-warning'
                    : 'status-error'
                }`}
              >
                {metric.status === 'good' ? 'On Track' : metric.status === 'warning' ? 'At Risk' : 'Behind'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricCard;
