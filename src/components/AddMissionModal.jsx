import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Check, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MiniCalendar from './MiniCalendar'

const SUBJECTS = [
  { id: 'mat' }, { id: 'tur' }, { id: 'sci' }, { id: 'soc' }, { id: 'eng' },
  { id: 'art' }, { id: 'mus' }, { id: 'pe' }, { id: 'rel' }, { id: 'other' }
]

export default function AddMissionModal({ isOpen, onClose, onAdd, editingMission, missions = [] }) {
  const { t, i18n } = useTranslation()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('mat')
  const [dueDate, setDueDate] = useState(new Date().toLocaleDateString('en-CA')) // YYYY-MM-DD local
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingMission) {
      setTitle(editingMission.title)
      setSubject(editingMission.subject || 'mat')
      setDueDate(editingMission.dueDate)
    } else {
      setTitle('')
      setSubject('mat')
      setDueDate(new Date().toLocaleDateString('en-CA'))
    }
    setErrors({})
  }, [editingMission, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (title.trim().length < 3) newErrors.title = t('modal.error_title')
    if (!dueDate) newErrors.dueDate = t('modal.error_date')
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd({
      id: editingMission?.id,
      title: title.trim(),
      subject,
      dueDate,
      completed: editingMission?.completed || false,
      createdAt: editingMission?.createdAt || new Date().toISOString()
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-xl rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-full sm:max-h-[90vh] mt-auto sm:mt-0"
          >
            <div className="bg-primary p-6 sm:p-8 text-white flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                {editingMission ? t('modal.edit_title') : t('modal.new_title')}
              </h3>
              <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2.5 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  {t('modal.what_to_do')}
                </label>
                <input 
                  autoFocus
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('modal.title_placeholder')}
                  className={`w-full bg-slate-50 border-4 ${errors.title ? 'border-red-100' : 'border-slate-50'} rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 placeholder:text-slate-200 focus:bg-white focus:border-primary/20 transition-all outline-none`}
                />
                {errors.title && <p className="text-red-500 text-[10px] font-black uppercase px-2">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  {t('modal.which_subject')}
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border-4 border-slate-50 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 outline-none focus:bg-white focus:border-primary/20 transition-all appearance-none cursor-pointer"
                  >
                    {SUBJECTS.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {t(`subjects.${sub.id}`).toLocaleUpperCase(i18n.language === 'tr' ? 'tr-TR' : 'en-US')}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={24} strokeWidth={3} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex justify-between items-center">
                  <span>{t('modal.due_date')}</span>
                  <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-lg">
                    {new Date(dueDate + "T00:00:00").toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-CA',
                      i18n.language === 'tr'
                        ? { day: '2-digit', month: '2-digit', year: 'numeric' }
                        : { year: 'numeric', month: '2-digit', day: '2-digit' }
                    ).replace(/\//g, i18n.language === 'tr' ? '.' : '-')}
                  </span>
                </label>
                <MiniCalendar 
                  selectedDate={dueDate}
                  onSelect={setDueDate}
                  missions={missions}
                />
                {errors.dueDate && <p className="text-red-500 text-[10px] font-black uppercase px-2">{errors.dueDate}</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white p-5 rounded-[2rem] text-xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
              >
                {editingMission ? <Check size={28} strokeWidth={4} /> : <Plus size={28} strokeWidth={4} />}
                {editingMission ? t('modal.save') : t('modal.create')}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
