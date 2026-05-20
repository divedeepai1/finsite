import { createContext, useContext, useState, ReactNode } from 'react';

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  source: string; // 'Ask AI', 'Compare', 'Summarize', etc.
  timestamp: Date;
  metadata?: {
    tags?: string[];
    category?: string;
  };
}

interface DocumentContextType {
  documentSections: DocumentSection[];
  addSection: (section: Omit<DocumentSection, 'id' | 'timestamp'>) => void;
  removeSection: (id: string) => void;
  clearAllSections: () => void;
  updateSection: (id: string, updates: Partial<DocumentSection>) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documentSections, setDocumentSections] = useState<DocumentSection[]>([]);

  const addSection = (section: Omit<DocumentSection, 'id' | 'timestamp'>) => {
    const newSection: DocumentSection = {
      ...section,
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    setDocumentSections(prev => [...prev, newSection]);
  };

  const removeSection = (id: string) => {
    setDocumentSections(prev => prev.filter(section => section.id !== id));
  };

  const clearAllSections = () => {
    setDocumentSections([]);
  };

  const updateSection = (id: string, updates: Partial<DocumentSection>) => {
    setDocumentSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  return (
    <DocumentContext.Provider
      value={{
        documentSections,
        addSection,
        removeSection,
        clearAllSections,
        updateSection,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}
