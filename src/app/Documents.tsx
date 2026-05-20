import { FileText, Download, Trash2, Calendar, Tag, Filter, Search, File, Copy, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDocument } from './contexts/DocumentContext';
import { useState } from 'react';
import { MarketTabs } from './components/MarketTabs';

export default function Documents() {
  const navigate = useNavigate();
  const { documentSections, removeSection, clearAllSections } = useDocument();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');

  const filteredSections = documentSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterSource === 'all' || section.source === filterSource;
    return matchesSearch && matchesFilter;
  });

  const sources = ['all', ...Array.from(new Set(documentSections.map(s => s.source)))];

  const handleExportDocument = () => {
    // Create document content
    let documentContent = '# Market Intelligence Document\n\n';
    documentContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    documentContent += '---\n\n';

    filteredSections.forEach((section, index) => {
      documentContent += `## ${section.title}\n\n`;
      documentContent += `**Source:** ${section.source}\n`;
      documentContent += `**Date:** ${section.timestamp.toLocaleDateString()}\n\n`;
      documentContent += `${section.content}\n\n`;
      documentContent += '---\n\n';
    });

    // Download as text file
    const blob = new Blob([documentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `market-intelligence-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    let allContent = '';
    filteredSections.forEach(section => {
      allContent += `${section.title}\n\n${section.content}\n\n---\n\n`;
    });
    try {
      navigator.clipboard.writeText(allContent);
    } catch (error) {
      console.error('Clipboard API not available:', error);
      // Fallback: create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = allContent;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Secondary Navigation - Tabs */}
      <MarketTabs currentTab="documents" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              Document Compiler
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Manage and export sections copied from various analysis modules
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyAll}
              disabled={filteredSections.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-[#111827] border border-gray-700 text-white rounded-lg hover:bg-[#1a2332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </button>
            <button
              onClick={handleExportDocument}
              disabled={filteredSections.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export Document
            </button>
            {documentSections.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all sections?')) {
                    clearAllSections();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="bg-[#111827] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              {sources.map(source => (
                <option key={source} value={source}>
                  {source === 'all' ? 'All Sources' : source}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        {documentSections.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 uppercase mb-1">Total Sections</div>
              <div className="text-2xl font-bold">{documentSections.length}</div>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 uppercase mb-1">Filtered Results</div>
              <div className="text-2xl font-bold">{filteredSections.length}</div>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 uppercase mb-1">Sources</div>
              <div className="text-2xl font-bold">{sources.length - 1}</div>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 uppercase mb-1">Last Added</div>
              <div className="text-sm font-bold text-gray-300">
                {documentSections[documentSections.length - 1]?.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Document Sections */}
        {filteredSections.length === 0 ? (
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-12 text-center">
            <File className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Documents Available</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchQuery || filterSource !== 'all'
                ? 'No sections match your search criteria. Try adjusting your filters.'
                : 'No documents have been added yet. Documents will appear here once you start creating content.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSections.map((section, index) => (
              <div
                key={section.id}
                className="bg-[#111827] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all"
              >
                {/* Section Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-blue-400 uppercase bg-blue-500/10 px-2 py-1 rounded">
                        {section.source}
                      </span>
                      {section.metadata?.category && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {section.metadata.category}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {section.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{section.title}</h3>
                  </div>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Section Content */}
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap bg-[#0B1220] border border-gray-800 rounded-lg p-4">
                    {section.content}
                  </div>
                </div>

                {/* Section Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                  <div className="text-xs text-gray-500">
                    Section {index + 1} of {filteredSections.length}
                  </div>
                  <button
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(`${section.title}\n\n${section.content}`);
                      } catch (error) {
                        console.error('Clipboard API not available:', error);
                        // Fallback: create a temporary textarea
                        const textarea = document.createElement('textarea');
                        textarea.value = `${section.title}\n\n${section.content}`;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                          document.execCommand('copy');
                        } catch (err) {
                          console.error('Fallback copy failed:', err);
                        }
                        document.body.removeChild(textarea);
                      }
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Section
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}