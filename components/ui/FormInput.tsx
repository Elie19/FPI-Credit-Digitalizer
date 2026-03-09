import React from 'react';
import { FormLabel } from './FormLabel';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  tooltip?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, required, tooltip, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <FormLabel label={label} required={required} tooltip={tooltip} />
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary font-bold text-sm outline-none transition-all placeholder:text-muted-foreground/30 text-foreground ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};
