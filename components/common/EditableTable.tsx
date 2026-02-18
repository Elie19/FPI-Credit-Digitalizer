
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select';
  options?: string[]; // Pour le type 'select'
  placeholder?: string;
  width?: string;
}

interface EditableTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, key: keyof T, value: any) => void;
}

export function EditableTable<T extends { id: string }>({ 
  title, 
  subtitle, 
  columns, 
  data, 
  onAdd, 
  onRemove, 
  onChange 
}: EditableTableProps<T>) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{title}</h4>
          {subtitle && <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1 tracking-wide">{subtitle}</p>}
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-2 border-blue-100 dark:border-blue-900/30 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all shadow-sm"
        >
          <Plus size={16} /> Ajouter une ligne
        </button>
      </div>
      
      <div className="overflow-x-auto border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] uppercase font-black border-b border-slate-100 dark:border-slate-800">
            <tr>
              {columns.map(col => (
                <th key={String(col.key)} className="px-8 py-5 tracking-wider whitespace-nowrap" style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              <th className="px-8 py-5 w-20 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-8 py-12 text-center text-slate-300 dark:text-slate-700 text-xs font-bold uppercase tracking-widest">
                  Aucune donnée enregistrée
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-8 py-4">
                      {col.type === 'select' ? (
                        <div className="relative">
                          <select
                            value={String(row[col.key])}
                            onChange={(e) => onChange(row.id, col.key, e.target.value)}
                            className="w-full bg-transparent outline-none font-bold text-xs text-slate-700 dark:text-slate-300 py-2 border-b-2 border-transparent focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" className="dark:bg-slate-900">Sélectionner...</option>
                            {col.options?.map(opt => (
                              <option key={opt} value={opt} className="dark:bg-slate-900">{opt}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <input 
                          type={col.type || 'text'}
                          value={String(row[col.key])}
                          placeholder={col.placeholder || '...'}
                          onChange={(e) => onChange(row.id, col.key, e.target.value)}
                          className="w-full bg-transparent outline-none font-bold text-xs text-slate-700 dark:text-slate-300 py-2 border-b-2 border-transparent focus:border-blue-500 placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors"
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-8 py-4 text-right">
                    <button 
                      onClick={() => onRemove(row.id)} 
                      className="text-slate-300 dark:text-slate-700 hover:text-red-500 dark:hover:text-red-400 transition-colors p-3 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
