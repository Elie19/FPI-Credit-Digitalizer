import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSectionWrapperProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  badge?: string;
}

export const FormSectionWrapper: React.FC<FormSectionWrapperProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  className = '',
  badge
}) => {
  return (
    <div className={`space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}>
      <div className="flex items-center gap-6 border-l-4 border-primary pl-6 py-2">
        <div className="p-3 bg-primary rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none">
          <Icon className="text-primary-foreground" size={28} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[9px] font-black rounded-full uppercase tracking-widest">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-10">
        {children}
      </div>
    </div>
  );
};
