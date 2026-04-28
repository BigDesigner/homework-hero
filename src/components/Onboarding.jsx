import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, Heart, Globe, ChevronRight } from 'lucide-react'

const AVATARS = [
  { id: 1, emoji: '🦊' }, { id: 2, emoji: '🐼' }, { id: 3, emoji: '🦁' },
  { id: 4, emoji: '🤖' }, { id: 5, emoji: '🚀' }, { id: 6, emoji: '🐱' },
  { id: 7, emoji: '🐶' }, { id: 8, emoji: '🦄' }, { id: 9, emoji: '🐉' },
  { id: 10, emoji: '👾' }, { id: 11, emoji: '🦸' }, { id: 12, emoji: '🧙' },
]

export default function Onboarding({ onComplete }) {
  const { t, i18n } = useTranslation()
  const [nickname, setNickname] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [theme, setTheme] = useState('blue')

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr'
    i18n.changeLanguage(newLang)
  }

  const handleFinish = () => {
    if (nickname.trim() && selectedAvatar) {
      onComplete({ nickname, avatarId: selectedAvatar, theme })
    }
  }

  const accentColor = theme === 'pink' ? '#f472b6' : '#5da9e9'

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-md py-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl border-4 border-white">
            {selectedAvatar ? AVATARS.find(a => a.id === selectedAvatar).emoji : '👋'}
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 italic">{t('app_name')}</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t('onboarding.sub')}</p>
        </div>

        {/* 1. Nickname */}
        <div className="mb-8">
          <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">
            {t('nickname')}
          </label>
          <input 
            type="text" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="..."
            className="w-full bg-slate-50 border-4 border-transparent focus:border-primary/20 focus:bg-white outline-none rounded-[2rem] px-8 py-5 text-lg font-bold text-slate-800 transition-all placeholder:text-slate-200"
          />
        </div>

        {/* 2. Avatar Picker */}
        <div className="mb-8">
          <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">
            {t('onboarding.choose_avatar')}
          </label>
          <div className="grid grid-cols-4 gap-3">
            {AVATARS.map(avatar => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`aspect-square rounded-2xl text-2xl flex items-center justify-center transition-all ${
                  selectedAvatar === avatar.id
                    ? 'scale-110 shadow-lg ring-4 ring-white z-10'
                    : 'bg-slate-50 text-slate-300 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-slate-100'
                }`}
                style={{ backgroundColor: selectedAvatar === avatar.id ? accentColor : '' }}
              >
                {avatar.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Theme Picker */}
        <div className="mb-8">
          <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">
            {t('settings.theme_title')}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTheme('blue')}
              className={`p-5 rounded-[2rem] border-4 flex items-center justify-center gap-3 transition-all ${
                theme === 'blue' 
                  ? 'bg-sky-500 border-sky-200 text-white shadow-lg scale-105' 
                  : 'bg-slate-50 border-transparent text-slate-400 opacity-60'
              }`}
            >
              <Sparkles size={18} />
              <span className="font-black text-xs uppercase tracking-widest">{t('settings.theme_blue')}</span>
            </button>
            <button 
              onClick={() => setTheme('pink')}
              className={`p-5 rounded-[2rem] border-4 flex items-center justify-center gap-3 transition-all ${
                theme === 'pink' 
                  ? 'bg-pink-400 border-pink-100 text-white shadow-lg scale-105' 
                  : 'bg-slate-50 border-transparent text-slate-400 opacity-60'
              }`}
            >
              <Heart size={18} fill={theme === 'pink' ? 'currentColor' : 'none'} />
              <span className="font-black text-xs uppercase tracking-widest">{t('settings.theme_pink')}</span>
            </button>
          </div>
        </div>

        {/* 4. Language Selection */}
        <div className="mb-10">
          <label className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
            <Globe size={14} /> {t('settings.language_title')}
          </label>
          <button 
            onClick={toggleLanguage}
            className="w-full bg-slate-50 hover:bg-slate-100 p-5 rounded-[2rem] flex items-center justify-between font-black transition-colors border-2 border-slate-50"
          >
            <span className="text-slate-700">{i18n.language === 'tr' ? 'Türkçe 🇹🇷' : 'English 🇺🇸'}</span>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
        </div>

        <button 
          onClick={handleFinish}
          disabled={!nickname.trim() || !selectedAvatar}
          className={`w-full font-black py-5 px-8 rounded-[2rem] text-xl transition-all flex items-center justify-center gap-3 group active:translate-y-1 active:shadow-none shadow-xl ${
            nickname.trim() && selectedAvatar
              ? 'text-white'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50'
          }`}
          style={{ 
            backgroundColor: nickname.trim() && selectedAvatar ? accentColor : '',
          }}
        >
          <span>{t('lets_go')}</span>
          <span className="group-hover:translate-x-1 transition-transform">➜</span>
        </button>
      </div>
    </div>
  )
}
