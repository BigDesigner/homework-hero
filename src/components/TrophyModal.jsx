import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Lock, Star, Zap, Book, Target, Clock, ShieldCheck, Flame, Music, Palette, Dumbbell, Moon, CalendarDays } from 'lucide-react'

// Define BADGES as an exportable constant so App.jsx can use it
export const TROPHIES = [
  { id: 'starter', name: 'starter_name', sub: 'starter_sub', icon: <Star size={32} />, color: 'bg-primary', 
    count: (m) => m.filter(x => x.completed).length },
  
  { id: 'math', name: 'math_name', sub: 'math_sub', icon: <Target size={32} />, color: 'bg-primary-dark', 
    count: (m) => m.filter(x => x.completed && (x.subject === 'mat' || x.subject === 'Matematik')).length },
  
  { id: 'turkish', name: 'turkish_name', sub: 'turkish_sub', icon: <Book size={32} />, color: 'bg-red-500', 
    count: (m) => m.filter(x => x.completed && (x.subject === 'tur' || x.subject === 'Türkçe')).length },
  
  { id: 'science', name: 'science_name', sub: 'science_sub', icon: <Flame size={32} />, color: 'bg-green-500', 
    count: (m) => m.filter(x => x.completed && (x.subject === 'sci' || x.subject === 'Fen Bilimleri')).length },

  { id: 'art', name: 'art_name', sub: 'art_sub', icon: <Palette size={32} />, color: 'bg-pink-500', 
    count: (m) => m.filter(x => x.completed && (x.subject === 'art' || x.subject === 'mus' || x.subject === 'Resim' || x.subject === 'Müzik')).length },

  { id: 'sport', name: 'sport_name', sub: 'sport_sub', icon: <Dumbbell size={32} />, color: 'bg-lime-500', 
    count: (m) => m.filter(x => x.completed && (x.subject === 'pe' || x.subject === 'Beden Eğitimi')).length },
  
  { id: 'fast', name: 'fast_name', sub: 'fast_sub', icon: <Zap size={32} />, color: 'bg-purple-500', 
    count: (m) => m.filter(x => x.completed && x.completedAt && new Date(x.completedAt).toDateString() === new Date(x.createdAt).toDateString()).length },
  
  { id: 'early', name: 'early_name', sub: 'early_sub', icon: <Clock size={32} />, color: 'bg-orange-500', 
    count: (m) => m.filter(x => x.completed && x.completedAt && new Date(x.completedAt).getHours() < 12).length },

  { id: 'night', name: 'night_name', sub: 'night_sub', icon: <Moon size={32} />, color: 'bg-slate-700', 
    count: (m) => m.filter(x => x.completed && x.completedAt && new Date(x.completedAt).getHours() >= 20).length },

  { id: 'weekend', name: 'weekend_name', sub: 'weekend_sub', icon: <CalendarDays size={32} />, color: 'bg-amber-600', 
    count: (m) => m.filter(x => x.completed && x.completedAt && (new Date(x.completedAt).getDay() === 0 || new Date(x.completedAt).getDay() === 6)).length },

  { id: 'warrior', name: 'warrior_name', sub: 'warrior_sub', icon: <ShieldCheck size={32} />, color: 'bg-indigo-500', 
    count: (m) => Math.floor(m.filter(x => x.completed).length / 10) },

  { id: 'clean', name: 'clean_name', sub: 'clean_sub', icon: <ShieldCheck size={32} />, color: 'bg-teal-500', 
    count: (m) => (m.length > 0 && m.every(x => x.completed)) ? 1 : 0 },
]

export default function TrophyModal({ isOpen, onClose, missions, t }) {
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
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="bg-primary p-8 text-white flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-black tracking-tight uppercase tracking-tighter">{t('nav.badges')}</h3>
              <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2.5 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-6">
              {TROPHIES.map((badge) => {
                const count = badge.count(missions)
                const isUnlocked = count > 0
                
                return (
                  <motion.div
                    key={badge.id}
                    whileHover={isUnlocked ? { scale: 1.05, rotate: [0, -1, 1, 0] } : {}}
                    className={`relative p-6 rounded-[2.5rem] border-4 flex flex-col items-center text-center transition-all ${
                      isUnlocked 
                        ? `${badge.color} border-white shadow-xl text-white` 
                        : 'bg-slate-50 border-slate-100 text-slate-300'
                    }`}
                  >
                    {/* Count Bubble */}
                    {isUnlocked && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-lg border-2 border-white flex items-center gap-1"
                      >
                        x{count}
                      </motion.div>
                    )}

                    {!isUnlocked && (
                      <div className="absolute top-4 right-4 text-slate-200">
                        <Lock size={16} />
                      </div>
                    )}

                    <div className={`mb-4 ${isUnlocked ? 'text-white' : 'text-slate-200 opacity-50'}`}>
                      {badge.icon}
                    </div>

                    <h4 className="font-black text-sm mb-1 leading-tight uppercase tracking-tighter">{t(`badges_data.${badge.name}`)}</h4>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${isUnlocked ? 'text-white/80' : 'text-slate-300'}`}>
                      {t(`badges_data.${badge.sub}`)}
                    </p>
                    
                    {isUnlocked && (
                      <div className="mt-3 flex gap-1">
                        {[...Array(Math.min(count, 5))].map((_, i) => (
                          <Star key={i} size={8} fill="currentColor" className="text-yellow-200" />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
              <p className="text-slate-400 font-bold text-xs">
                {t('badges_data.footer_tip')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
