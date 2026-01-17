import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Search,
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  Bot,
  HelpCircle,
} from 'lucide-react';
import { generateAuditLogs } from '../../data/auditLogs';
import { talkingPoints } from '../../data/talkingPoints';

const ComplianceDashboard: React.FC = () => {
  const [selectedPolicyNumber] = useState('HO-2026-001847');
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [filterText, setFilterText] = useState('');
  const [selectedTalkingPoint, setSelectedTalkingPoint] = useState<string | null>(null);

  const auditLogs = useMemo(
    () => generateAuditLogs(selectedPolicyNumber),
    [selectedPolicyNumber]
  );

  const filteredLogs = useMemo(() => {
    if (!filterText) return auditLogs;
    const lower = filterText.toLowerCase();
    return auditLogs.filter(
      (log) =>
        log.action.toLowerCase().includes(lower) ||
        log.agentName.toLowerCase().includes(lower) ||
        log.details.toLowerCase().includes(lower)
    );
  }, [auditLogs, filterText]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const complianceMetrics = [
    { label: 'State Filing Compliance', value: '100%', sublabel: 'All 50 states' },
    { label: 'Rate Accuracy', value: '99.94%', sublabel: '2 manual overrides' },
    { label: 'Form Selection', value: '100%', sublabel: '0 errors this month' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">
            Regulatory Compliance & Audit Center
          </h2>
          <p className="text-gray-400 mt-1">
            Complete audit trail and compliance verification for every decision
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Audit Log
          </button>
          <button className="btn-primary">
            <FileText className="w-4 h-4" />
            Generate State Exam Package
          </button>
        </div>
      </div>

      {/* Compliance Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 col-span-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Overall Compliance</p>
              <p className="text-3xl font-bold text-success-400 mt-1">99.7%</p>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-success-500/30 flex items-center justify-center bg-success-500/10">
              <Shield className="w-7 h-7 text-success-400" />
            </div>
          </div>
        </motion.div>

        {complianceMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="glass-card p-6"
          >
            <p className="text-sm text-gray-400">{metric.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
            <p className="text-xs text-gray-500 mt-1">{metric.sublabel}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Trail Table */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white">
              Audit Trail - Policy #{selectedPolicyNumber}
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter actions..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-9 pr-4 py-2 bg-navy-700 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500/50"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {filteredLogs.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="border border-white/5 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedEntry(expandedEntry === index ? null : index)
                  }
                  className="w-full p-3 flex items-center justify-between bg-navy-700/50 hover:bg-navy-700 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric-500/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-electric-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {entry.action}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {entry.agentName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      {formatTime(entry.timestamp)}
                    </span>
                    {expandedEntry === index ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedEntry === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-navy-800/50 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Details
                          </p>
                          <p className="text-sm text-gray-300">{entry.details}</p>
                        </div>

                        {entry.decisionRationale && (
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Decision Rationale
                            </p>
                            <p className="text-sm text-electric-400">
                              {entry.decisionRationale}
                            </p>
                          </div>
                        )}

                        {entry.dataAccessed.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Data Accessed
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {entry.dataAccessed.map((data) => (
                                <span
                                  key={data}
                                  className="px-2 py-1 bg-navy-700 rounded text-xs text-gray-400"
                                >
                                  {data}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive FAQ / Talking Points */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-electric-400" />
            <h3 className="font-display font-semibold text-white">
              Executive FAQ
            </h3>
          </div>

          <div className="space-y-2">
            {talkingPoints.map((point) => (
              <div key={point.id} className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setSelectedTalkingPoint(
                      selectedTalkingPoint === point.id ? null : point.id
                    )
                  }
                  className="w-full p-3 flex items-center justify-between bg-navy-700/30 hover:bg-navy-700/50 transition-colors text-left"
                >
                  <span className="text-sm text-gray-300">{point.question}</span>
                  {selectedTalkingPoint === point.id ? (
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {selectedTalkingPoint === point.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-navy-800/30">
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {point.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Reports Section */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-sm font-semibold text-white mb-3">
              Examiner-Ready Reports
            </h4>
            <div className="space-y-2">
              {[
                'State Exam Package',
                'Export Audit Log',
                'Rate Review Report',
                'Compliance Summary',
              ].map((report) => (
                <button
                  key={report}
                  className="w-full p-3 bg-navy-700/50 hover:bg-navy-700 rounded-lg flex items-center justify-between text-left transition-colors"
                >
                  <span className="text-sm text-gray-300">{report}</span>
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
