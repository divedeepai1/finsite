import { FileText, Trash2, Eye, Download, Calendar, Tag, Search } from 'lucide-react';
import { useState } from 'react';

interface SavedDocument {
  id: string;
  title: string;
  content: any;
  source: string;
  savedAt: Date;
  type: 'ask-ai' | 'compare' | 'summarize' | 'investment-thesis';
}

interface AIInsightsDocumentsProps {
  documents: SavedDocument[];
  onDelete: (id: string) => void;
}

export function AIInsightsDocuments({ documents, onDelete }: AIInsightsDocumentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewingDoc, setViewingDoc] = useState<SavedDocument | null>(null);

  const typeLabels = {
    'ask-ai': 'Ask AI',
    'compare': 'Compare',
    'summarize': 'Summarize',
    'investment-thesis': 'Investment Thesis',
  };

  const typeColors = {
    'ask-ai': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'compare': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'summarize': 'bg-green-500/10 text-green-400 border-green-500/30',
    'investment-thesis': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (viewingDoc) {
    return (
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => setViewingDoc(null)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-bold">Back to Documents</span>
        </button>

        {/* Document Viewer */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg">
          {/* Header */}
          <div className="border-b border-gray-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{viewingDoc.title}</h1>
                  <p className="text-sm text-gray-400 mt-1">Source: {viewingDoc.source}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={() => onDelete(viewingDoc.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${typeColors[viewingDoc.type]}`}>
                {typeLabels[viewingDoc.type]}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {new Date(viewingDoc.savedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              {typeof viewingDoc.content === 'string' ? (
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{viewingDoc.content}</p>
              ) : (
                <div className="text-gray-300 text-sm">
                  {viewingDoc.content}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Saved Documents</h1>
        <p className="text-sm text-gray-400">All documents saved from AI Insights tabs</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full bg-[#111827] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-[#111827] border border-gray-700 text-sm rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Types</option>
          <option value="ask-ai">Ask AI</option>
          <option value="compare">Compare</option>
          <option value="summarize">Summarize</option>
          <option value="investment-thesis">Investment Thesis</option>
        </select>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-12 text-center">
          <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Documents Found</h3>
          <p className="text-sm text-gray-400">
            {searchQuery || selectedType !== 'all'
              ? 'Try adjusting your filters'
              : 'Save documents from Ask AI, Compare, Summarize, or Investment Thesis tabs'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#111827] border border-gray-800 rounded-lg p-6 hover:border-blue-500/30 transition-all cursor-pointer group"
            >
              {/* Document Icon & Type */}
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className={`px-2 py-1 rounded border text-xs font-semibold ${typeColors[doc.type]}`}>
                  {typeLabels[doc.type]}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{doc.title}</h3>

              {/* Source */}
              <p className="text-sm text-gray-400 mb-3 line-clamp-1">
                <Tag className="w-3 h-3 inline mr-1" />
                {doc.source}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Calendar className="w-3 h-3" />
                {new Date(doc.savedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setViewingDoc(doc)}
                  className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => onDelete(doc.id)}
                  className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {filteredDocuments.length > 0 && (
        <div className="mt-6 flex items-center justify-between bg-[#111827] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">
            Showing <span className="text-white font-semibold">{filteredDocuments.length}</span> of{' '}
            <span className="text-white font-semibold">{documents.length}</span> documents
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-400">
                {documents.filter(d => d.type === 'ask-ai').length} Ask AI
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-gray-400">
                {documents.filter(d => d.type === 'compare').length} Compare
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-400">
                {documents.filter(d => d.type === 'summarize').length} Summarize
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-gray-400">
                {documents.filter(d => d.type === 'investment-thesis').length} Investment Thesis
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
