import React from 'react';

interface FormRadioGroupProps {
  label: string;
  options: { value: string | boolean; label: string }[];
  value: string | boolean;
  onChange: (value: any) => void;
  className?: string;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ label, options, value, onChange, className = '' }) => {
  return (
    <div className={`flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner ${className}`}>
      <div className="flex items-center gap-4">
        <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">
          {label}
        </label>
      </div>
      <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-8 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
              value === opt.value
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
