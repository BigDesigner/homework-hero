import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, XCircle, Calendar, Clock } from 'lucide-react'

const SUBJECT_STYLES = {
  'mat': { pill: 'bg-blue-100 text-blue-600 border-blue-200', accent: 'border-blue-400' },
  'tur': { pill: 'bg-red-100 text-red-600 border-red-200', accent: 'border-red-400' },
  'sci': { pill: 'bg-green-100 text-green-600 border-green-200', accent: 'border-green-400' },
  'soc': { pill: 'bg-orange-100 text-orange-600 border-orange-200', accent: 'border-orange-400' },
  'eng': { pill: 'bg-purple-100 text-purple-600 border-purple-200', accent: 'border-purple-400' },
  'art': { pill: 'bg-pink-100 text-pink-600 border-pink-200', accent: 'border-pink-400' },
  'mus': { pill: 'bg-cyan-100 text-cyan-600 border-cyan-200', accent: 'border-cyan-400' },
  'pe': { pill: 'bg-lime-100 text-lime-600 border-lime-200', accent: 'border-lime-400' },
  'rel': { pill: 'bg-teal-100 text-teal-600 border-teal-200', accent: 'border-teal-400' },
  'other': { pill: 'bg-slate-100 text-slate-500 border-slate-200', accent: 'border-slate-300' },
  'Matematik': { pill: 'bg-blue-100 text-blue-600 border-blue-200', accent: 'border-blue-400' },
  'Türkçe': { pill: 'bg-red-100 text-red-600 border-red-200', accent: 'border-red-400' },
  'Fen Bilimleri': { pill: 'bg-green-100 text-green-600 border-green-200', accent: 'border-green-400' },
  'Sosyal Bilgiler': { pill: 'bg-orange-100 text-orange-600 border-orange-200', accent: 'border-orange-400' },
  'İngilizce': { pill: 'bg-purple-100 text-purple-600 border-purple-200', accent: 'border-purple-400' }
}

const NAME_TO_KEY = {
  'Matematik': 'mat', 'Türkçe': 'tur', 'Fen Bilimleri': 'sci', 'Sosyal Bilgiler': 'soc', 'İngilizce': 'eng'
}

export default function MissionCard({ mission, onToggle, onDelete, onEdit }) {
  const { t, i18n } = useTranslation()
  
  // Time Calculation Logic
  // Fix: Force local timezone by adding T00:00:00. This prevents 1-day shifts.
  const today = new Date().setHours(0,0,0,0)
  const due = new Date(mission.dueDate + "T00:00:00").setHours(0,0,0,0)
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
  
  const getTimeInfo = () => {
    if (mission.completed) return { text: t('status.completed'), color: 'text-tertiary' }
    if (diffDays < 0) return { text: t('status.overdue'), color: 'text-red-500' }
    if (diffDays === 0) return { text: t('status.today'), color: 'text-red-600 animate-pulse font-black' }
    if (diffDays === 1) return { text: t('status.tomorrow'), color: 'text-orange-500' }
    if (diffDays <= 3) return { text: t('status.days_left', { count: diffDays }), color: 'text-amber-500' }
    return { text: t('status.plenty_time', { count: diffDays }), color: 'text-green-500' }
  }

  const timeInfo = getTimeInfo()
  const styleKey = mission.subject || 'other'
  const style = SUBJECT_STYLES[styleKey] || SUBJECT_STYLES['other']
  const i18nKey = NAME_TO_KEY[styleKey] || styleKey
  const displayLabel = i18nKey.length <= 5 ? t(`subjects.${i18nKey}`) : styleKey

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative group bg-white p-6 rounded-[2rem] shadow-soft border-l-8 transition-all flex items-center gap-5 ${style.accent} ${
        mission.completed ? 'opacity-60 grayscale-[0.5]' : 'hover:-translate-y-1'
      }`}
    >
      <div onClick={() => onEdit(mission)} className="flex-1 cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${style.pill}`}>
            {displayLabel}
          </span>
          {mission.completed && (
            <span className="bg-tertiary/10 text-tertiary text-[8px] font-black px-2 py-1 rounded-lg uppercase">{t('dashboard.completed_label')} ✨</span>
          )}
        </div>
        
        <h4 className={`text-xl font-black text-slate-800 leading-tight mb-3 ${mission.completed ? 'line-through text-slate-400' : ''}`}>
          {mission.title}
        </h4>
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <Calendar size={14} />
            {new Date(mission.dueDate + "T00:00:00").toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-CA', 
              i18n.language === 'tr' 
                ? { day: '2-digit', month: '2-digit', year: 'numeric' }
                : { year: 'numeric', month: '2-digit', day: '2-digit' }
            ).replace(/\//g, i18n.language === 'tr' ? '.' : '-')}
          </div>
          <div className={`flex items-center gap-2 text-[11px] font-black ${timeInfo.color}`}>
            <Clock size={14} />
            {timeInfo.text}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(mission.id); }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90 ${
            mission.completed 
              ? 'bg-tertiary text-white shadow-tertiary/20' 
              : 'bg-white border-4 border-slate-50 text-slate-200 hover:border-tertiary/30 hover:text-tertiary'
          }`}
        >
          <CheckCircle2 size={32} strokeWidth={3} />
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if(window.confirm(t('common.confirm_delete') || 'Emin misin?')) onDelete(mission.id);
          }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-90
            bg-red-50 text-red-400 border-4 border-transparent hover:border-red-100
            [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
        >
          <XCircle size={32} strokeWidth={3} />
        </button>
      </div>
    </motion.div>
  )
}
