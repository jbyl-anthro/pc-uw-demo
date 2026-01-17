import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, Bot } from 'lucide-react';
import { recentActivities } from '../../data/auditLogs';

const AgentActivityFeed: React.FC = () => {
  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning-400" />;
      case 'error':
        return <Clock className="w-4 h-4 text-danger-400" />;
    }
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white">
          Agent Activity Feed
        </h3>
        <span className="status-badge status-processing">
          <span className="w-2 h-2 bg-electric-400 rounded-full mr-2 animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-navy-700/50 hover:bg-navy-700 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-electric-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-electric-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate">
                  {activity.agent}
                </span>
                {getStatusIcon(activity.status)}
              </div>
              <p className="text-sm text-gray-400 truncate">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {activity.time}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Showing last 8 activities</span>
          <button className="text-electric-400 hover:text-electric-300 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentActivityFeed;
