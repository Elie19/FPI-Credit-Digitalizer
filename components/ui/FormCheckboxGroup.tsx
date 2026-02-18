import React from 'react';

interface Option {
  value: string;
  label: string;
  color?: 'emerald' | 'amber' | 'blue' | 'slate';
}

interface FormCheckboxGroupProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2 | 3;
}

export const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  columns = 2,
}) => {
  const toggleValue = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(next);
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  const colorClasses = {
    emerald: 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-300 shadow-md',
    amber: 'border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-300 shadow-md',
    blue: 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 shadow-md',
    slate: 'border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md',
  };

  return (
    <div className="space-y-6">
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {label}
      </label>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const colorClass = option.color ? colorClasses[option.color] : colorClasses.emerald;

          return (
            <label
              key={option.value}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? colorClass
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => toggleValue(option.value)}
              />
              <div
                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-white dark:border-slate-900'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                {isSelected && (
                  <div
                    className={`w-2.5 h-2.5 rounded-sm ${
                      option.color === 'slate' ? 'bg-slate-900 dark:bg-slate-100' : 'bg-current'
                    }`}
                  />
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tight leading-tight">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
