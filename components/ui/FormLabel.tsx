import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface FormLabelProps {
  label: string;
  required?: boolean;
  tooltip?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ label, required, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {tooltip && (
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <HelpCircle size={12} className="text-slate-300 dark:text-slate-600 cursor-help hover:text-primary transition-colors" />
          
          {showTooltip && (
            <div className="absolute left-full ml-2 z-50 w-48 p-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[9px] font-bold rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900 dark:border-r-slate-100" />
              {tooltip}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
