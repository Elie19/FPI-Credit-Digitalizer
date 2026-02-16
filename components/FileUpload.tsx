import React from 'react';
import { Upload, FileCheck, AlertCircle, X, Plus } from 'lucide-react';
import { RequiredDoc } from '../types';

interface FileUploadProps {
  doc: RequiredDoc;
  onFileSelect: (file: File | null) => void;
  currentFile: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ doc, onFileSelect, currentFile }) => {
  const inputId = `file-${doc.id}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
      currentFile 
        ? 'border-green-500 bg-green-50/50' 
        : 'border-red-200 bg-white hover:border-red-400 shadow-sm'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          currentFile ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'
        }`}>
          {currentFile ? <FileCheck size={20} /> : <Upload size={20} />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate leading-tight">
              {doc.label}
            </h4>
            {doc.required && !currentFile && (
              <AlertCircle size={14} className="text-red-500 animate-pulse shrink-0" />
            )}
          </div>
          
          <p className="text-[10px] text-slate-500 font-medium mb-3">
            {doc.category} • {doc.formats.join(', ')}
          </p>

          <div className="flex items-center gap-2">
            {currentFile ? (
              <div className="flex items-center gap-2 bg-white border border-green-200 px-3 py-1.5 rounded-lg shadow-sm">
                <span className="text-[10px] font-bold text-green-700 truncate max-w-[120px]">
                  {currentFile.name}
                </span>
                <button onClick={() => onFileSelect(null)} className="text-slate-400 hover:text-red-500">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label 
                htmlFor={inputId}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
              >
                Joindre <Plus size={12} />
                <input 
                  id={inputId} 
                  type="file" 
                  className="hidden" 
                  accept={doc.formats.join(',')} 
                  onChange={handleChange} 
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};