import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Globe, Cloud, Trash2, Palette, Sparkles, Heart, ChevronRight, AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { storage } from '../utils/storage'

const AVATARS = [
  { id: 1, emoji: '🦊' }, { id: 2, emoji: '🐼' }, { id: 3, emoji: '🦁' },
  { id: 4, emoji: '🤖' }, { id: 5, emoji: '🚀' }, { id: 6, emoji: '🐱' },
  { id: 7, emoji: '🐶' }, { id: 8, emoji: '🦄' }, { id: 9, emoji: '🐉' },
  { id: 10, emoji: '👾' }, { id: 11, emoji: '🦸' }, { id: 12, emoji: '🧙' },
]

export default function SettingsModal({ isOpen, onClose, user, onUpdateUser }) {
  const { t, i18n } = useTranslation()
  const [nickname, setNickname] = useState(user?.nickname || '')
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarId || 1)
  const [selectedTheme, setSelectedTheme] = useState(user?.theme || 'blue')
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    if (confirmReset) {
      const timer = setTimeout(() => setConfirmReset(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [confirmReset])

  const handleSave = () => {
    onUpdateUser({ ...user, nickname, avatarId: selectedAvatar, theme: selectedTheme })
    onClose()
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr'
    i18n.changeLanguage(newLang)
  }

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    // Final Confirmation - Perform Reset
    console.log('Resetting all data...')
    storage.clearAll()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, x: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: 100 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="bg-primary p-8 text-white flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-black tracking-tight uppercase tracking-tighter">{t('nav.settings')}</h3>
              <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Profile Section */}
              <section className="space-y-4">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <User size={14} /> {t('nickname')}
                </label>
                <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t('nickname')}
                  className="w-full bg-slate-50 border-4 border-transparent focus:border-primary/20 focus:bg-white outline-none rounded-2xl px-5 py-4 font-bold text-slate-700 transition-all mb-2"
                />
                <div className="grid grid-cols-6 gap-2">
                  {AVATARS.map(av => (
                    <button 
                      key={av.id}
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all ${
                        selectedAvatar === av.id ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-slate-50 hover:bg-slate-100 text-slate-400'
                      }`}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </section>

              {/* Theme Section */}
              <section className="space-y-4">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Palette size={14} /> {t('settings.theme_title')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setSelectedTheme('blue')}
                    className={`p-4 rounded-2xl flex items-center justify-center gap-3 border-4 transition-all ${
                      selectedTheme === 'blue' 
                        ? 'bg-sky-500 border-sky-200 text-white shadow-lg scale-105' 
                        : 'bg-slate-50 border-transparent text-slate-400'
                    }`}
                  >
                    <Sparkles size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">{t('settings.theme_blue')}</span>
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('pink')}
                    className={`p-4 rounded-2xl flex items-center justify-center gap-3 border-4 transition-all ${
                      selectedTheme === 'pink' 
                        ? 'bg-pink-400 border-pink-100 text-white shadow-lg scale-105' 
                        : 'bg-slate-50 border-transparent text-slate-400'
                    }`}
                  >
                    <Heart size={18} fill={selectedTheme === 'pink' ? 'currentColor' : 'none'} />
                    <span className="font-black text-xs uppercase tracking-widest">{t('settings.theme_pink')}</span>
                  </button>
                </div>
              </section>

              {/* Language Section */}
              <section className="space-y-4">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Globe size={14} /> {t('settings.language_title')}
                </label>
                <button 
                  onClick={toggleLanguage}
                  className="w-full bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl flex items-center justify-between font-black transition-colors"
                >
                  <span className="text-slate-700">{i18n.language === 'tr' ? 'Türkçe 🇹🇷' : 'English 🇺🇸'}</span>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
              </section>

              {/* Backup Section */}
              <section className="space-y-4 opacity-60">
                <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Cloud size={14} /> {t('settings.cloud_title')}
                </label>
                <div className="bg-slate-50 p-5 rounded-2xl border-4 border-dashed border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('settings.coming_soon')}</p>
                </div>
              </section>

              {/* Danger Zone */}
              <section className="pt-4 border-t-2 border-slate-50">
                <button 
                  onClick={handleReset}
                  className={`w-full flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all py-3 rounded-xl ${
                    confirmReset 
                      ? 'bg-red-500 text-white shadow-lg scale-105 animate-pulse' 
                      : 'text-red-300 hover:text-red-500'
                  }`}
                >
                  {confirmReset ? <AlertTriangle size={16} /> : <Trash2 size={16} />}
                  <span>
                    {confirmReset 
                      ? (i18n.language === 'tr' ? 'EVET, HER ŞEYİ SİL! ⚠️' : 'YES, RESET ALL! ⚠️') 
                      : t('settings.reset_data')}
                  </span>
                </button>
              </section>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-sm"
              >
                {t('modal.save')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
