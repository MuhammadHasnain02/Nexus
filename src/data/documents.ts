export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'Draft' | 'In Review' | 'Signed';
  uploadedBy: string;
  date: string;
  fileUrl?: string;
  signatureImage?: string;
}

export const initialDocuments: Document[] = [
  { 
    id: '1', 
    name: 'Seed_Round_Term_Sheet.pdf', 
    type: 'Contract', 
    status: 'Draft', 
    uploadedBy: 'Sarah Johnson', 
    date: '2026-03-10' ,
  },
  { 
    id: '2', 
    name: 'Equity_Agreement_v1.pdf', 
    type: 'Legal', 
    status: 'Signed', 
    uploadedBy: 'Sarah Johnson', 
    date: '2026-03-08' 
  },
];