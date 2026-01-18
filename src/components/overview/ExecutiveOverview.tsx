import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Clock,
  Shield,
  TrendingUp,
  ChevronRight,
  Network,
  LayoutDashboard,
  FileText,
  Bot,
  CheckCircle,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

const ExecutiveOverview: React.FC = () => {
  const { setActiveSection } = useDemoStore();

  const businessImpacts = [
    {
      icon: Clock,
      metric: '70%',
      label: 'Faster Quote Turnaround',
      description: 'From 48 hours to under 15 minutes for standard risks',
    },
    {
      icon: TrendingUp,
      metric: '40%',
      label: 'Higher Straight-Through Rate',
      description: 'More policies processed without manual intervention',
    },
    {
      icon: Shield,
      metric: '99.7%',
      label: 'Compliance Accuracy',
      description: 'Every decision audited and explainable to regulators',
    },
    {
      icon: Zap,
      metric: '60%',
      label: 'Reduced Data Entry Errors',
      description: 'AI extraction eliminates manual keying mistakes',
    },
  ];

  const demoSections = [
    {
      id: 'architecture' as const,
      icon: Network,
      title: 'Agent Architecture',
      description: 'See how specialized AI agents work together - from intake to issuance',
      color: 'electric',
    },
    {
      id: 'dashboard' as const,
      icon: LayoutDashboard,
      title: 'Operations Center',
      description: 'Real-time visibility into submissions, quotes, binds, and compliance',
      color: 'success',
    },
    {
      id: 'workflows' as const,
      icon: Bot,
      title: 'Live Workflows',
      description: 'Watch agents process homeowners, auto, and umbrella policies',
      color: 'warning',
    },
    {
      id: 'documents' as const,
      icon: FileText,
      title: 'Document Intelligence',
      description: 'See ACORD forms and dec pages extracted in real-time',
      color: 'electric',
    },
    {
      id: 'compliance' as const,
      icon: Shield,
      title: 'Audit & Compliance',
      description: 'Complete audit trails with decision explainability',
      color: 'success',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'electric':
        return 'bg-electric-500/20 text-electric-400 border-electric-500/30';
      case 'success':
        return 'bg-success-500/20 text-success-400 border-success-500/30';
      case 'warning':
        return 'bg-warning-500/20 text-warning-400 border-warning-500/30';
      default:
        return 'bg-electric-500/20 text-electric-400 border-electric-500/30';
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Transform Underwriting with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-electric-600">
            Agentic AI
          </span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          See how Claude-powered agents can process submissions, generate quotes,
          and bind policies in minutes instead of days - while maintaining complete
          regulatory compliance and audit trails.
        </p>
      </motion.div>

      {/* The Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8"
      >
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          The Challenge You Face Today
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-danger-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-danger-400 text-sm">1</span>
              </div>
              <p className="text-gray-300">
                <strong className="text-white">Slow quote turnaround</strong> -
                Manual data entry, document review, and rating calculations create
                bottlenecks that frustrate agents and lose business.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-danger-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-danger-400 text-sm">2</span>
              </div>
              <p className="text-gray-300">
                <strong className="text-white">Data entry errors</strong> -
                Human keying mistakes lead to incorrect premiums, coverage gaps,
                and E&O exposure.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-danger-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-danger-400 text-sm">3</span>
              </div>
              <p className="text-gray-300">
                <strong className="text-white">Compliance burden</strong> -
                Documenting decisions for market conduct exams is time-consuming
                and often incomplete.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-danger-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-danger-400 text-sm">4</span>
              </div>
              <p className="text-gray-300">
                <strong className="text-white">Underwriter burnout</strong> -
                Skilled staff spend 80% of time on routine tasks instead of
                complex risk evaluation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Business Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">
          What Agentic AI Delivers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessImpacts.map((impact, i) => (
            <motion.div
              key={impact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-electric-500/20 flex items-center justify-center mx-auto mb-4">
                <impact.icon className="w-6 h-6 text-electric-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{impact.metric}</p>
              <p className="text-sm font-semibold text-electric-400 mb-2">
                {impact.label}
              </p>
              <p className="text-xs text-gray-500">{impact.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works - Brief */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <h2 className="font-display text-2xl font-bold text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-400 mb-6">
          Multiple specialized AI agents collaborate to handle the complete underwriting
          workflow. Each agent is an expert at specific tasks, and they work together
          through a secure orchestration layer.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {['Submission Received', 'Documents Extracted', 'Data Validated', 'Premium Rated', 'Compliance Verified', 'Quote Issued'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-2 px-3 py-2 bg-navy-700/50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success-400" />
                <span className="text-gray-300">{step}</span>
              </div>
              {i < 5 && <ChevronRight className="w-4 h-4 text-gray-600" />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Demo Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-display text-2xl font-bold text-white mb-2 text-center">
          Explore the Demo
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Click any section below to dive deeper, or use the navigation tabs above.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoSections.map((section, i) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(section.id)}
              className="glass-card p-6 text-left hover:border-electric-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${getColorClasses(section.color)}`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                    {section.title}
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-electric-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-400">{section.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* What This Demo Shows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8 border-electric-500/20"
      >
        <h2 className="font-display text-xl font-bold text-white mb-4">
          What You're About to See
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-success-400 mb-2">This demo shows:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                Real workflow patterns used in production deployments
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                Actual processing times based on Claude's capabilities
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                Complete audit trails for regulatory compliance
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                Human-in-the-loop checkpoints for complex decisions
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-400 mb-2">For transparency, this demo uses:</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-gray-600">-</span>
                Simulated data (no real policies or customers)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">-</span>
                Mock API responses (not connected to live systems)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-600">-</span>
                Representative metrics (actual results vary by implementation)
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center"
      >
        <button
          onClick={() => setActiveSection('architecture')}
          className="btn-primary text-lg px-8 py-4"
        >
          Start with Agent Architecture
          <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-gray-500 text-sm mt-4">
          Recommended: View sections in order for the best experience
        </p>
      </motion.div>
    </div>
  );
};

export default ExecutiveOverview;
