import { X, Save, FileText, Check } from 'lucide-react';
import { useState } from 'react';
import { useDocument } from '../contexts/DocumentContext';

interface DocumentSection {
  title: string;
  content: string;
  category?: string;
}

interface DocumentViewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sections: DocumentSection[];
  source: string; // e.g., 'Ask AI', 'House View', etc.
  onOpenDocumentSlider?: (title: string, content: any, source: string) => void;
  onDirectSave?: (title: string, content: any, source: string) => void;
}

export function DocumentViewPanel({ isOpen, onClose, sections, source, onOpenDocumentSlider, onDirectSave }: DocumentViewPanelProps) {
  const { addSection } = useDocument();
  const [copiedSections, setCopiedSections] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const handleCopyToDocument = (section: DocumentSection, index: number) => {
    // If onDirectSave is provided (AI Insights context), use it
    if (onDirectSave) {
      onDirectSave(section.title, section.content, source);
    } else if (onOpenDocumentSlider) {
      // Fallback to slider if provided
      onOpenDocumentSlider(section.title, section.content, source);
    } else {
      // Otherwise use the Markets context
      addSection({
        title: section.title,
        content: section.content,
        source: source,
        metadata: {
          category: section.category,
        },
      });
    }

    // Show copied feedback
    setCopiedSections(prev => new Set(prev).add(index));
    setTimeout(() => {
      setCopiedSections(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-[500px] bg-[#0B1220] border-l border-gray-800 shadow-2xl z-50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Document View</h2>
            <p className="text-xs text-gray-400">{source}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {sections.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No content to display</p>
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all"
            >
              {/* Section Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {section.category && (
                    <div className="text-xs text-blue-400 uppercase font-bold mb-1">
                      {section.category}
                    </div>
                  )}
                  <h3 className="text-base font-bold text-white">{section.title}</h3>
                </div>
                <button
                  onClick={() => handleCopyToDocument(section, index)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    copiedSections.has(index)
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30'
                  }`}
                >
                  {copiedSections.has(index) ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3" />
                      Copy to Document
                    </>
                  )}
                </button>
              </div>

              {/* Section Content */}
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4 bg-[#111827]">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{sections.length} section{sections.length !== 1 ? 's' : ''}</span>
          <button
            onClick={onClose}
            className="text-blue-400 hover:text-blue-300 font-bold"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}