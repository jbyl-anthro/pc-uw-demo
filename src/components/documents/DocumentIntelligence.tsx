import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  Database,
  Zap,
  Eye,
} from 'lucide-react';
import { documentTypes } from '../../data/auditLogs';
import { acordFields } from '../../data/sampleSubmissions';

const DocumentIntelligence: React.FC = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedFields, setExtractedFields] = useState<typeof acordFields>([]);
  const [showDemo, setShowDemo] = useState(false);

  const runExtraction = useCallback(async () => {
    setShowDemo(true);
    setIsExtracting(true);
    setExtractedFields([]);

    // Simulate extraction with progressive field reveals
    for (let i = 0; i < acordFields.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setExtractedFields((prev) => [...prev, acordFields[i]]);
    }

    setIsExtracting(false);
  }, []);

  const resetDemo = () => {
    setShowDemo(false);
    setExtractedFields([]);
    setIsExtracting(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold text-white">
          Document Intelligence Engine
        </h2>
        <p className="text-gray-400 mt-1">
          See how Claude extracts and validates data from insurance documents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Structured Data Sources */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-electric-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-electric-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">
                Structured Data Sources
              </h3>
              <p className="text-sm text-gray-400">API-connected systems</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                name: 'Policy Admin (Guidewire PolicyCenter)',
                type: 'Real-time policy data, coverage details',
              },
              {
                name: 'Rating Engine (ISO/AAIS)',
                type: 'Base rates, territory factors, class codes',
              },
              {
                name: 'LexisNexis',
                type: 'MVR, CLUE reports (structured JSON)',
              },
              {
                name: 'CoreLogic',
                type: 'Property data, replacement cost',
              },
              {
                name: 'Verisk',
                type: 'Fire protection class, ISO ratings',
              },
            ].map((source, i) => (
              <div
                key={i}
                className="p-3 bg-navy-700/50 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-white">{source.name}</p>
                  <p className="text-xs text-gray-500">{source.type}</p>
                </div>
                <span className="status-badge status-success text-xs">
                  Connected
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Unstructured Data Processing */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-success-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">
                Unstructured Data Processing
              </h3>
              <p className="text-sm text-gray-400">Document extraction metrics</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-gray-400 font-medium">
                    Document Type
                  </th>
                  <th className="text-right py-2 text-gray-400 font-medium">
                    Accuracy
                  </th>
                  <th className="text-right py-2 text-gray-400 font-medium">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {documentTypes.map((doc) => (
                  <tr key={doc.id} className="border-b border-white/5">
                    <td className="py-2 text-gray-300">{doc.name}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`font-medium ${
                          doc.extractionAccuracy >= 98
                            ? 'text-success-400'
                            : doc.extractionAccuracy >= 95
                            ? 'text-electric-400'
                            : 'text-warning-400'
                        }`}
                      >
                        {doc.extractionAccuracy}%
                      </span>
                    </td>
                    <td className="py-2 text-right text-gray-400">
                      {doc.avgProcessingTime} sec
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Live Extraction Demo */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-warning-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">
                Live Extraction Demo
              </h3>
              <p className="text-sm text-gray-400">
                Watch an ACORD 80 application being processed
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {!showDemo ? (
              <button onClick={runExtraction} className="btn-primary">
                <Eye className="w-4 h-4" />
                Run Demo
              </button>
            ) : (
              <button onClick={resetDemo} className="btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Simulated Document */}
              <div className="bg-navy-900 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    ACORD 80 - Homeowners Application
                  </span>
                  <span className="status-badge status-processing text-xs">
                    {isExtracting ? 'Extracting...' : 'Complete'}
                  </span>
                </div>
                <div className="bg-white rounded p-4 text-gray-900 text-xs font-mono leading-relaxed h-[400px] overflow-y-auto">
                  <div className="text-center mb-4 font-bold">
                    ACORD 80 (2016/03)
                    <br />
                    HOMEOWNERS APPLICATION
                  </div>
                  <div className="space-y-2">
                    <div>
                      <strong>APPLICANT INFORMATION</strong>
                    </div>
                    <div>
                      Name: Jennifer & Michael Chen
                      <br />
                      Address: 1847 Oak Valley Drive
                      <br />
                      City: Walnut Creek State: CA ZIP: 94596
                      <br />
                      Phone: (415) 555-0847
                      <br />
                      Email: jchen@email.com
                    </div>
                    <div className="mt-4">
                      <strong>PROPERTY INFORMATION</strong>
                    </div>
                    <div>
                      Location: Same as mailing address
                      <br />
                      Year Built: 2019
                      <br />
                      Construction: Frame
                      <br />
                      Roof Type: Composition Shingle
                      <br />
                      Square Feet: 2,400
                      <br />
                      Stories: 2
                    </div>
                    <div className="mt-4">
                      <strong>COVERAGE REQUESTED</strong>
                    </div>
                    <div>
                      Policy Type: HO-3
                      <br />
                      Dwelling: $485,000
                      <br />
                      Personal Property: $242,500
                      <br />
                      Liability: $300,000
                      <br />
                      Medical Payments: $5,000
                      <br />
                      Deductible: $1,000
                    </div>
                    <div className="mt-4">
                      <strong>PRIOR INSURANCE</strong>
                    </div>
                    <div>
                      Carrier: State Farm
                      <br />
                      Policy #: 23-HO-847293
                      <br />
                      Years: 3
                    </div>
                    <div className="mt-4">
                      <strong>PROTECTIVE DEVICES</strong>
                    </div>
                    <div>
                      [X] Burglar Alarm
                      <br />
                      [X] Smoke Detectors
                      <br />
                      [X] Deadbolt Locks
                    </div>
                  </div>
                </div>
              </div>

              {/* Extracted Fields */}
              <div className="bg-navy-900 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-400">
                    Extracted Data
                  </span>
                  <span className="text-xs text-gray-500">
                    {extractedFields.length} / {acordFields.length} fields
                  </span>
                </div>
                <div className="h-[400px] overflow-y-auto space-y-2 pr-2">
                  {extractedFields.map((field, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-2 bg-navy-700/50 rounded"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0" />
                        <div className="truncate">
                          <span className="text-xs text-gray-500">
                            {field.field}:
                          </span>
                          <span className="text-sm text-white ml-2">
                            {field.value}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium ml-2 flex-shrink-0 ${
                          field.confidence >= 98
                            ? 'text-success-400'
                            : field.confidence >= 95
                            ? 'text-electric-400'
                            : 'text-warning-400'
                        }`}
                      >
                        {field.confidence}%
                      </span>
                    </motion.div>
                  ))}
                  {isExtracting && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex items-center gap-2 p-2"
                    >
                      <Clock className="w-4 h-4 text-electric-400" />
                      <span className="text-sm text-electric-400">
                        Extracting...
                      </span>
                    </motion.div>
                  )}
                </div>

                {extractedFields.length === acordFields.length && (
                  <div className="mt-4 p-3 bg-success-500/10 border border-success-500/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-400" />
                      <span className="text-sm text-success-400 font-medium">
                        Extraction Complete
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      23 fields extracted with 98.7% average confidence in 8
                      seconds
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showDemo && (
          <div className="border-2 border-dashed border-navy-600 rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">
              Click "Run Demo" to see live document extraction
            </p>
            <p className="text-sm text-gray-500">
              Watch Claude process an ACORD 80 application in real-time
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentIntelligence;
