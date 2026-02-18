import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[] | string[];
  error?: string;
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, options, error, required, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-slate-900 dark:focus:border-slate-400 font-bold text-sm outline-none transition-all text-slate-900 dark:text-slate-100 ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const label = typeof opt === 'string' ? opt : opt.label;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};
