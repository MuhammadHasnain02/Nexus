import React, { useState, useRef } from 'react';
import { FileText, CheckCircle2, Clock, PenTool, Download, Eye, FileUp, Trash2, X, RotateCcw, Upload, Search } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useDocuments } from '../../hooks/useDocument.ts';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'Draft' | 'In Review' | 'Signed';
  uploadedBy: string;
  date: string;
  fileUrl?: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

interface IconButtonProps {
  icon: React.ReactNode; // Icon ke liye ReactNode use hota hai
  title: string;         // Title string hogi
  onClick: () => void;   // Click function
}

export const DocumentChamber: React.FC<{ role: 'investor' | 'entrepreneur' }> = ({ role }) => {

  const { documents, uploadDocument, deleteDocument, signDocument } = useDocuments();

  const [isDragging, setIsDragging] = useState(false);
  const [activeSignDocId, setActiveSignDocId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    uploadDocument(file, role); 
  };

  const handleSignConfirm = (signatureData: string) => {
    if (activeSignDocId) {
      signDocument(activeSignDocId, signatureData); 
      
      setActiveSignDocId(null);
      alert("Document Signed Successfully!");
    }
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-700">

      <div className="flex justify-between items-end border-b border-slate-100 pb-4">

        <div>
          <h1 className="text-[26px] font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search files..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/60 transition-all w-64"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
          
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-[10px] flex items-center gap-2 shadow-sm shadow-indigo-200">
            <Upload size={18} />
            <span className="hidden sm:inline">Upload New</span>
          </Button>
        </div>

      </div>

      

      {/* Drag & Drop Zone */}
      {role === 'entrepreneur' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]); }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer transition-all duration-300 border-2 border-dashed rounded-[2rem] p-12 text-center 
            ${isDragging ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]' : 'border-indigo-200 bg-white hover:border-indigo-400 hover:bg-slate-50/50'}`}
        >
          <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} accept=".pdf" />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <FileUp size={32} />
            </div>
            <p className="text-lg font-medium text-slate-700">
              <span className="text-indigo-600 font-bold underline decoration-2 underline-offset-4">Click here</span> to upload your PDF or drag.
            </p>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<FileText />} label="Total Assets" value={documents.length} color="blue" />
        <StatCard icon={<Clock />} label="Awaiting Review" value={documents.filter(doc => doc.status === 'In Review').length} color="indigo" />
        <StatCard icon={<CheckCircle2 />} label="Signed Deals" value={documents.filter(doc => doc.status === 'Signed').length} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* Storage info */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Storage</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Used</span>
              <span className="font-medium text-gray-900">12.5 GB</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available</span>
              <span className="font-medium text-gray-900">7.5 GB</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Access</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Recent Files
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Shared with Me
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Starred
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Trash
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Documents List */}
      <div className="lg:col-span-3 space-y-3">
        {/* <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Recent Documents</h3> */}

        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sort by
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </CardHeader>

        {documents.map((doc) => (
          <Card key={doc.id} className="border-none shadow-sm hover:shadow-md transition-all border border-transparent hover:border-indigo-100">
            <CardBody className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 text-indigo-500 rounded-xl"><FileText size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-800">{doc.name}</h3>
                  <p className="text-[11px] text-slate-400 font-medium uppercase">{doc.type} • {doc.date} • BY {doc.uploadedBy}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <Badge variant={doc.status === 'Signed' ? 'success' : doc.status === 'Draft' && role === 'investor' ? 'warning' : 'secondary'}>
                  {doc.status === 'Draft' && role === 'investor' ? 'In Review' : doc.status}
                </Badge>

                <div className="flex items-center gap-1">
                  <IconButton icon={<Eye size={18} />} title="View" onClick={() => setPreviewDoc(doc)} />
                  <IconButton icon={<Download size={18} />} title="Download" onClick={() => alert('Downloaded!')} />
                  
                  {role === 'entrepreneur' && (
                    <IconButton 
                      icon={<Trash2 size={18} className="text-red-400" />} 
                      title="Delete" 
                      onClick={() => deleteDocument(doc.id)} 
                    />
                  )}

                  {role === 'investor' && doc.status === 'In Review' && (
                    <Button 
                      onClick={() => setActiveSignDocId(doc.id)}
                      size="sm" 
                      className="ml-2 bg-slate-900 hover:bg-black text-white rounded-lg px-4"
                    >
                      <PenTool size={14} className="mr-2" /> Execute
                    </Button>
                  )}

                  {role === 'investor' && doc.status === 'Draft' && (
                    <Button 
                      onClick={() => setActiveSignDocId(doc.id)}
                      size="sm" 
                      className="ml-2 bg-slate-900 hover:bg-black text-white rounded-lg px-4"
                    >
                      <PenTool size={14} className="mr-2" /> Execute
                    </Button>
                  )}

                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      </div>

      {/* --- MODALS --- */}

      {/* 1. REAL PDF Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-3xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-300">

            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 tracking-tight">{previewDoc.name}</h3>
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Secure Document Viewer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={() => alert('Downloaded!')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
                    <Download size={16} /> Download
                 </button>
                 <button onClick={() => setPreviewDoc(null)} className="p-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all">
                    <X size={20}/>
                 </button>
              </div>

            </div>

            <div className="flex-1 bg-slate-50 flex justify-center items-center overflow-auto">
              {previewDoc.fileUrl ? (
                <iframe src={previewDoc.fileUrl} className="w-full h-full rounded-2xl shadow-2xl border border-slate-200" title="PDF Preview" />
              ) : (
                <div className="text-center p-20 bg-white shadow-xl rounded-[3rem] border border-blue-50">
                   <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText size={48} className="text-blue-200" />
                   </div>
                   <h4 className="text-2xl font-bold text-slate-800">Preview Unavailable</h4>
                   <p className="text-slate-400 mt-2 max-w-xs mx-auto">This system-generated file does not have a local URL. Please upload a real PDF.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. REAL Signature Modal */}
      {activeSignDocId && (
        <SignatureModal 
          onClose={() => setActiveSignDocId(null)} 
          onConfirm={handleSignConfirm}
        />
      )}
    </div>
  );
};

// --- Sub-components ---

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-5 shadow-sm">
    <div className={`p-4 bg-${color}-50 text-${color}-600 rounded-xl`}>{icon}</div>
    <div>
      <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{label}</p>
      <p className="font-bold text-[20px] text-slate-800">{value}</p>
    </div>
  </div>
);

const IconButton: React.FC<IconButtonProps> = ({ icon, title, onClick }) => (
  <button onClick={onClick} title={title} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
    {icon}
  </button>
);

// ✅ REAL Signature Component using Library
const SignatureModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: (data: string) => void }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => sigCanvas.current?.clear();
  
  const save = () => {
    if (sigCanvas.current?.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    const canvas = sigCanvas.current?.getCanvas();
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onConfirm(dataUrl);
    }

    // const dataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    // if (dataUrl) onConfirm(dataUrl);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-300">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-slate-900">Digital Signature</h3>
          <p className="text-sm text-slate-500 mt-2">Use your mouse or touch-screen to sign below.</p>
        </div>
        
        <div className="border-2 border-slate-100 bg-slate-50 rounded-3xl overflow-hidden mb-6 relative">
          <SignatureCanvas 
            ref={sigCanvas}
            penColor='black'
            canvasProps={{className: 'sigCanvas w-full h-48 cursor-crosshair'}}
          />
          <button 
            onClick={clear}
            className="absolute bottom-3 right-3 p-2 bg-white shadow-sm border rounded-lg text-slate-400 hover:text-red-500 transition-colors"
            title="Clear Canvas"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 rounded-xl h-12" onClick={onClose}>Discard</Button>
          <Button className="flex-1 bg-indigo-600 rounded-xl h-12 text-white" onClick={save}>Confirm & Sign</Button>
        </div>
      </div>
    </div>
  );
};