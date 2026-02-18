
import React from 'react';
import { Upload, FileCheck, X, AlertTriangle } from 'lucide-react';

interface RequiredDocumentUploadProps {
  id: string; // Identifiant unique du document dans formData.files
  label: string;
  description?: string;
  required?: boolean;
  currentFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export const RequiredDocumentUpload: React.FC<RequiredDocumentUploadProps> = ({
  id,
  label,
  description,
  required = false,
  currentFile,
  onFileSelect,
}) => {
  const inputId = `doc-upload-${id}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const isMissing = required && !currentFile;

  return (
    <div className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 ${
      currentFile 
        ? 'border-green-500 dark:border-green-600 bg-green-50/30 dark:bg-green-900/10' 
        : isMissing 
          ? 'border-red-300 dark:border-red-900/50 bg-red-50/30 dark:bg-red-900/10 hover:border-red-400 dark:hover:border-red-800' 
          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700'
    }`}>
      <div className="flex items-start gap-5">
        {/* Icone d'état */}
        <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
          currentFile 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900/50' 
            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-100 dark:border-slate-700'
        }`}>
          {currentFile ? <FileCheck size={28} /> : <Upload size={28} />}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {label} {required && <span className="text-red-500 ml-1">*</span>}
              </h4>
              {description && (
                <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold mt-1 uppercase tracking-wide">
                  {description}
                </p>
              )}
            </div>
            {isMissing && (
              <div className="flex items-center gap-1.5 text-[10px] font-black text-red-500 dark:text-red-400 uppercase bg-red-100 dark:bg-red-900/30 px-3 py-1.5 rounded-xl">
                <AlertTriangle size={14} /> Requis
              </div>
            )}
          </div>

          <div className="mt-5">
            {currentFile ? (
              <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 pl-4 rounded-2xl border border-green-200 dark:border-green-900/50 shadow-sm">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                  {currentFile.name}
                </span>
                <button 
                  onClick={() => onFileSelect(null)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label 
                htmlFor={inputId}
                className="inline-flex items-center gap-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg shadow-slate-200 dark:shadow-none hover:shadow-xl hover:-translate-y-0.5"
              >
                Sélectionner un fichier
                <input 
                  id={inputId} 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
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
