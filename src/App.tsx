import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Network,
  Zap,
  FileText,
  Shield,
  Home,
} from 'lucide-react';
import { useDemoStore } from './store/demoStore';
import ExecutiveOverview from './components/overview/ExecutiveOverview';
import ExecutiveDashboard from './components/dashboard/ExecutiveDashboard';
import AgentArchitecture from './components/agents/AgentArchitecture';
import WorkflowSimulator from './components/workflows/WorkflowSimulator';
import DocumentIntelligence from './components/documents/DocumentIntelligence';
import ComplianceDashboard from './components/compliance/ComplianceDashboard';

type Section = 'overview' | 'architecture' | 'dashboard' | 'workflows' | 'documents' | 'compliance';

const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
  { id: 'architecture', label: 'Agent Architecture', icon: <Network className="w-4 h-4" /> },
  { id: 'dashboard', label: 'Operations Center', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'workflows', label: 'Live Workflows', icon: <Zap className="w-4 h-4" /> },
  { id: 'documents', label: 'Document Intelligence', icon: <FileText className="w-4 h-4" /> },
  { id: 'compliance', label: 'Audit & Compliance', icon: <Shield className="w-4 h-4" /> },
];

function App() {
  const { activeSection, setActiveSection } = useDemoStore();

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ExecutiveOverview />;
      case 'architecture':
        return <AgentArchitecture />;
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'workflows':
        return <WorkflowSimulator />;
      case 'documents':
        return <DocumentIntelligence />;
      case 'compliance':
        return <ComplianceDashboard />;
      default:
        return <ExecutiveOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-navy-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-500 to-electric-600 flex items-center justify-center shadow-lg shadow-electric-500/20">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-white">
                  P&C Underwriting Operations
                </h1>
                <p className="text-sm text-gray-400">Powered by Claude Agents</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="status-badge status-success">
                <span className="w-2 h-2 bg-success-400 rounded-full mr-2 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-white/5 bg-navy-800/30 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`nav-tab whitespace-nowrap flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'nav-tab-active'
                    : 'nav-tab-inactive'
                }`}
              >
                {section.icon}
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-navy-800/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>
              Demo showcasing agentic AI for P&C insurance underwriting operations
            </p>
            <p>
              Powered by{' '}
              <span className="text-electric-400">Claude</span> |{' '}
              <span className="text-gray-400">Anthropic</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
