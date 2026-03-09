import React from 'react';
import { FormLabel } from './FormLabel';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  tooltip?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ label, error, required, tooltip, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <FormLabel label={label} required={required} tooltip={tooltip} />
      <textarea
        {...props}
        className={`w-full p-6 rounded-[2rem] border-2 border-border bg-background focus:border-primary font-bold text-sm outline-none transition-all placeholder:text-muted-foreground/30 text-foreground resize-none min-h-[120px] ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};
