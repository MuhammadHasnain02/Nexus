// import React, { createContext, useState, ReactNode } from 'react';

// // 1. Types define karein
// export interface Document {
//   id: string;
//   name: string;
//   type: string;
//   status: 'Draft' | 'In Review' | 'Signed';
//   uploadedBy: string;
//   date: string;
//   fileUrl?: string;
//   signatureImage?: string; // Signature save karne ke liye
// }

// interface DocumentContextType {
//   documents: Document[];
//   uploadDocument: (file: File, role: string) => void;
//   deleteDocument: (id: string) => void;
//   signDocument: (id: string, signatureData: string) => void;
// }

// // 2. Context create karein
// export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// // 3. Provider component banayein
// export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // Ye hamara "Global Database" hai
//   const [documents, setDocuments] = useState<Document[]>([
//     { id: '1', name: 'Seed_Round_Term_Sheet.pdf', type: 'Contract', status: 'In Review', uploadedBy: 'Sarah Johnson', date: '2026-03-10' },
//   ]);

//   const uploadDocument = (file: File, role: string) => {
//     const fileUrl = URL.createObjectURL(file);
//     const newDoc: Document = {
//       id: Math.random().toString(36).substr(2, 9),
//       name: file.name,
//       type: 'PDF',
//       status: role === 'entrepreneur' ? 'In Review' : 'Draft',
//       uploadedBy: role === 'entrepreneur' ? 'Founder' : 'Investor',
//       date: new Date().toISOString().split('T')[0],
//       fileUrl: fileUrl
//     };
//     setDocuments(prev => [newDoc, ...prev]);
//   };

//   const deleteDocument = (id: string) => {
//     setDocuments(prev => prev.filter(doc => doc.id !== id));
//   };

//   const signDocument = (id: string, signatureData: string) => {
//     setDocuments(prev => prev.map(doc => 
//       doc.id === id ? { ...doc, status: 'Signed', signatureImage: signatureData } : doc
//     ));
//   };

//   return (
//     <DocumentContext.Provider value={{ documents, uploadDocument, deleteDocument, signDocument }}>
//       {children}
//     </DocumentContext.Provider>
//   );
// };


// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
// import { INITIAL_DOCUMENTS } from '../data/documents';

// export interface Document {
//   id: string;
//   name: string;
//   type: string;
//   status: 'Draft' | 'In Review' | 'Signed';
//   uploadedBy: string;
//   date: string;
//   fileUrl?: string; // Note: Blobs temporary hote hain, refresh pe expire ho jate hain
//   signatureImage?: string;
// }

// interface DocumentContextType {
//   documents: Document[];
//   uploadDocument: (file: File, role: string) => void;
//   deleteDocument: (id: string) => void;
//   signDocument: (id: string, signatureData: string) => void;
// }

// export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // 1. Initialize State: Pehle localstorage check karo, warna initial data uthao
//   const [documents, setDocuments] = useState<Document[]>(() => {
//     const savedDocs = localStorage.getItem('venture_docs');
//     return savedDocs ? JSON.parse(savedDocs) : INITIAL_DOCUMENTS;
//   });

//   // 2. Persistence: Jab bhi documents change hon, LocalStorage update kar do
//   useEffect(() => {
//     localStorage.setItem('venture_docs', JSON.stringify(documents));
//   }, [documents]);

//   // 3. Tab Sync (Real-life Pro Tip): 
//   // Agar user ne doosre tab mein sign kiya, toh is tab ko pata chal jaye
//   useEffect(() => {
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'venture_docs' && e.newValue) {
//         setDocuments(JSON.parse(e.newValue));
//       }
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const uploadDocument = (file: File, role: string) => {
//     const fileUrl = URL.createObjectURL(file);
//     const newDoc: Document = {
//       id: Math.random().toString(36).substr(2, 9),
//       name: file.name,
//       type: 'PDF',
//       status: role === 'entrepreneur' ? 'In Review' : 'Draft',
//       uploadedBy: role === 'entrepreneur' ? 'Founder' : 'Investor',
//       date: new Date().toISOString().split('T')[0],
//       fileUrl: fileUrl
//     };
//     setDocuments(prev => [newDoc, ...prev]);
//   };

//   const deleteDocument = (id: string) => {
//     setDocuments(prev => prev.filter(doc => doc.id !== id));
//   };

//   const signDocument = (id: string, signatureData: string) => {
//     setDocuments(prev => prev.map(doc => 
//       doc.id === id ? { ...doc, status: 'Signed', signatureImage: signatureData } : doc
//     ));
//   };

//   return (
//     <DocumentContext.Provider value={{ documents, uploadDocument, deleteDocument, signDocument }}>
//       {children}
//     </DocumentContext.Provider>
//   );
// };


import React, { createContext, useState, ReactNode } from 'react';
import { Document, initialDocuments } from '../data/documents'; // ✅ Data import kiya
import { DocumentContextType } from '../types';

// interface DocumentContextType {
//   documents: Document[];
//   uploadDocument: (file: File, role: string) => void;
//   deleteDocument: (id: string) => void;
//   signDocument: (id: string, signatureData: string) => void;
// }

// 1. Context create karein
export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// 2. Provider component
export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ✅ State ko initial data se populate kiya
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  // --- Upload Logic ---
  const uploadDocument = (file: File, role: string) => {
    const fileUrl = URL.createObjectURL(file);
    
    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9), // Real-life mein ye ID backend se aati hai
      name: file.name,
      type: 'PDF',
      status: 'Draft',
      uploadedBy: role === 'entrepreneur' ? 'Founder' : 'Investor',
      date: new Date().toISOString().split('T')[0],
      fileUrl: fileUrl
    };

    // Data mein add kar dena
    setDocuments(prevDocs => [newDoc, ...prevDocs]);
  };

  // --- Delete Logic ---
  const deleteDocument = (id: string) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
  };

  // --- Sign/Filter Logic ---
  const signDocument = (id: string, signatureData: string) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        // ID se filter/check karke status change karna
        if (doc.id === id) {
          return { 
            ...doc, 
            status: 'Signed' as const, 
            signatureImage: signatureData 
          };
        }
        return doc;
      })
    );
  };

  return (
    <DocumentContext.Provider value={{ documents, uploadDocument, deleteDocument, signDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

