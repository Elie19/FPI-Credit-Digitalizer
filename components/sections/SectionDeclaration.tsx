
import React from 'react';
import { FPIFormData } from '../../types';
import { PenTool, ShieldCheck, AlertCircle } from 'lucide-react';
import { FormSectionWrapper } from '../ui/FormSectionWrapper';

interface SectionProps {
  formData: FPIFormData;
  updateData: (fields: Partial<FPIFormData>) => void;
}

export const SectionDeclaration: React.FC<SectionProps> = ({ formData, updateData }) => {
  return (
    <FormSectionWrapper 
      title="Déclaration Finale" 
      subtitle="Engagement et attestation de sincérité."
      icon={PenTool}
    >
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-inner space-y-12">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-xl">
            Je, soussigné Mr/Mme <input 
              type="text" 
              value={formData.declarationNom}
              onChange={e => updateData({ declarationNom: e.target.value })}
              className="inline-block px-4 py-1 mx-2 border-b-2 border-slate-300 dark:border-slate-700 focus:border-slate-900 dark:focus:border-slate-100 outline-none bg-transparent font-black text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
              placeholder="Nom complet"
            /> 
            (<span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">Nom et fonction du demandeur</span>), 
            agissant au nom et pour le compte de l'entreprise <span className="font-black text-slate-900 dark:text-white underline decoration-slate-300 dark:decoration-slate-700 decoration-2 underline-offset-8">{formData.raisonSociale || "____________________"}</span> 
            (<span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">Nom et adresse de l'entreprise</span>), 
            atteste par la présente que les informations contenues dans cette demande de financement sont exactes et sincères.
          </p>

          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-xl mt-8">
            Je déclare que j'ai bien pris connaissance du fait que la demande de financement fera l'objet d'une évaluation interne.
          </p>

          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-xl mt-8">
            A cet effet, je m'engage à fournir libre accès aux analystes évaluateurs tous les documents et locaux ayant un rapport direct avec l'intervention et à mettre tout en œuvre pour que l'instruction de mon dossier se déroule dans les meilleures conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest w-16">Fait à</label>
              <input 
                type="text" 
                value={formData.declarationLieu}
                onChange={e => updateData({ declarationLieu: e.target.value })}
                className="flex-1 px-6 py-3 rounded-2xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-slate-900 dark:focus:border-slate-100 font-bold text-sm outline-none transition-all"
                placeholder="Lieu"
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest w-16">Le</label>
              <input 
                type="date" 
                value={formData.declarationDate}
                onChange={e => updateData({ declarationDate: e.target.value })}
                className="flex-1 px-6 py-3 rounded-2xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:border-slate-900 dark:focus:border-slate-100 font-bold text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <div 
              onClick={() => updateData({ declarationAcceptee: !formData.declarationAcceptee })}
              className={`group flex items-center gap-6 p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer w-full max-w-sm ${
                formData.declarationAcceptee 
                  ? 'bg-emerald-900 dark:bg-emerald-100 border-emerald-900 dark:border-emerald-100 text-white dark:text-emerald-900 shadow-2xl shadow-emerald-200 dark:shadow-none scale-105' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                formData.declarationAcceptee ? 'bg-white dark:bg-emerald-900 text-emerald-900 dark:text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
              }`}>
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-black uppercase tracking-tight leading-tight ${
                  formData.declarationAcceptee ? 'text-white dark:text-emerald-900' : 'text-slate-900 dark:text-white'
                }`}>
                  J'accepte les termes et je signe numériquement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 bg-blue-50 dark:bg-blue-900/20 rounded-[3rem] border border-blue-100 dark:border-blue-900/30 flex items-start gap-8 shadow-sm">
        <AlertCircle className="w-10 h-10 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-blue-900 dark:text-blue-300 font-black text-sm uppercase tracking-wider mb-2">Note de confidentialité</h4>
          <p className="text-blue-800/70 dark:text-blue-400/70 text-xs font-bold leading-relaxed">
            Les informations recueillies font l'objet d'un traitement informatique destiné à l'instruction de votre dossier de crédit. 
            Le FPI s'engage à garantir la confidentialité de vos données conformément aux lois en vigueur en République Démocratique du Congo.
          </p>
        </div>
      </div>
    </FormSectionWrapper>
  );
};
