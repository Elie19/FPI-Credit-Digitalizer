import React from 'react';
import { FormLabel } from './FormLabel';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[] | string[];
  error?: string;
  required?: boolean;
  tooltip?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, options, error, required, tooltip, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <FormLabel label={label} required={required} tooltip={tooltip} />
      <select
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary font-bold text-sm outline-none transition-all text-foreground ${
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
