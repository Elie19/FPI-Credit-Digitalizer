
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'number' | 'select' | 'checkbox';
  options?: string[];
}

interface DynamicTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, key: keyof T, value: any) => void;
}

export function DynamicTable<T extends { id: string }>({ 
  title, 
  columns, 
  data, 
  onAdd, 
  onRemove, 
  onChange 
}: DynamicTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-t-xl border-x border-t border-slate-200">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{title}</h4>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
        >
          <Plus size={14} /> Ajouter une ligne
        </button>
      </div>
      <div className="overflow-x-auto border-x border-b border-slate-200 rounded-b-xl shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
            <tr>
              {columns.map(col => (
                <th key={String(col.key)} className="px-4 py-3">{col.label}</th>
              ))}
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400 italic">
                  Aucune donnée saisie
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-4 py-2">
                      {col.type === 'select' ? (
                        <select 
                          className="w-full border-none focus:ring-0 p-1 bg-transparent"
                          value={String(row[col.key])}
                          onChange={(e) => onChange(row.id, col.key, e.target.value)}
                        >
                          {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input 
                          type={col.type || 'text'}
                          className="w-full border-none focus:ring-0 p-1 bg-transparent"
                          value={String(row[col.key])}
                          onChange={(e) => onChange(row.id, col.key, e.target.value)}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => onRemove(row.id)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={14} />
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
