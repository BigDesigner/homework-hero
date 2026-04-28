import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react'

export default function CalendarModal({ isOpen, onClose, missions }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Calendar Logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => {
    const d = new Date(year, month, 1).getDay()
    return d === 0 ? 6 : d - 1 // Shift to start from Monday
  }

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())

  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))

  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear()
  }

  const isSelected = (day) => {
    return day === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear()
  }

  const getMissionsForDate = (day) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0]
    return missions.filter(m => m.dueDate === dateStr)
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
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-tertiary p-8 flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <CalendarIcon size={32} strokeWidth={3} />
                <h3 className="text-3xl font-black tracking-tight">Görev Takvimi</h3>
              </div>
              <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-2xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
              {/* Calendar Grid Section */}
              <div className="bg-slate-50 rounded-[2.5rem] p-6 shadow-inner border-2 border-slate-100">
                <div className="flex items-center justify-between mb-6 px-2">
                  <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
                    {currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                  </h4>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 text-slate-400 transition-colors"><ChevronLeft size={20}/></button>
                    <button onClick={nextMonth} className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 text-slate-400 transition-colors"><ChevronRight size={20}/></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
                    <div key={d} className="text-[10px] font-black text-slate-300 text-center uppercase tracking-widest">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1
                    const dayMissions = getMissionsForDate(day)
                    const hasMissions = dayMissions.length > 0
                    const allCompleted = hasMissions && dayMissions.every(m => m.completed)
                    const selected = isSelected(day)
                    const today = isToday(day)

                    let btnClass = "bg-white border-transparent text-slate-400"
                    
                    if (selected) {
                      btnClass = "bg-tertiary text-white border-white shadow-xl scale-110 z-10"
                    } else if (today) {
                      btnClass = "bg-primary text-white border-white shadow-lg z-10"
                    } else if (hasMissions) {
                      if (allCompleted) {
                        btnClass = "bg-white border-green-400/30 text-green-600 shadow-sm"
                      } else {
                        btnClass = "bg-white border-orange-400/50 text-orange-600 shadow-sm animate-pulse-subtle"
                      }
                    }

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        className={`relative h-12 sm:h-16 rounded-2xl font-black text-sm transition-all flex flex-col items-center justify-center gap-1 border-4 ${btnClass}`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Selected Day Missions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h5 className="font-black text-slate-400 uppercase text-[10px] tracking-widest flex items-center gap-2">
                    <Star size={14} className="text-yellow-400" />
                    {selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} GÖREVLERİ
                  </h5>
                  <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    {getMissionsForDate(selectedDate.getDate()).length} Görev
                  </span>
                </div>

                <div className="space-y-3">
                  {getMissionsForDate(selectedDate.getDate()).length === 0 ? (
                    <div className="bg-slate-50 border-4 border-dashed border-slate-100 rounded-3xl p-10 text-center text-slate-300 font-bold text-sm">
                      Bu gün tertemiz! Dinlenme vakti kahraman! 🧸
                    </div>
                  ) : (
                    getMissionsForDate(selectedDate.getDate()).map(mission => (
                      <div 
                        key={mission.id}
                        className={`p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all ${
                          mission.completed 
                            ? 'bg-slate-50 border-slate-100 opacity-60' 
                            : 'bg-white border-slate-100 shadow-sm hover:border-tertiary/10'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mission.completed ? 'bg-tertiary/10 text-tertiary' : 'bg-slate-100 text-slate-400'}`}>
                            {mission.completed ? <CheckCircle2 size={24} /> : <div className="w-5 h-5 border-4 border-slate-200 rounded-full" />}
                          </div>
                          <div>
                            <p className={`font-black text-base leading-tight ${mission.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {mission.title}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{mission.subject || 'Genel'}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 text-center border-t border-slate-100 flex-shrink-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Takvimdeki kutuları boyamaya devam et kahraman! 🚀
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
