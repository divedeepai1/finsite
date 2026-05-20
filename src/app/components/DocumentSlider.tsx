import { X, Save, Copy, Download, FileText } from 'lucide-react';
import { useState } from 'react';

interface DocumentSliderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: any) => void;
  title: string;
  content: any;
  tabName: string;
}

export function DocumentSlider({ isOpen, onClose, onSave, title, content, tabName }: DocumentSliderProps) {
  const [docTitle, setDocTitle] = useState(title);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(docTitle, content);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  const handleCopy = () => {
    // Convert content to text for copying
    const textContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    try {
      navigator.clipboard.writeText(textContent);
    } catch (error) {
      console.error('Clipboard API not available:', error);
      // Fallback: create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = textContent;
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
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-[600px] bg-[#0B1220] border-l border-gray-800 z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#111827] border-b border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Save to Documents</h2>
                <p className="text-sm text-gray-400">From {tabName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Document Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full bg-[#0D1525] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Enter document title..."
            />
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Content Preview</h3>
            <div className="prose prose-invert max-w-none">
              {typeof content === 'string' ? (
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
              ) : (
                <div className="text-gray-300 text-sm">
                  {content}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#111827] border-t border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 px-4 py-3 bg-[#162033] border border-gray-700 text-white rounded-lg hover:bg-[#1C2A40] transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy to Clipboard
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                isSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save to Documents
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}