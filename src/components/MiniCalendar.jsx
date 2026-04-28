import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function MiniCalendar({ selectedDate, onSelect, missions = [] }) {
  const initialDate = selectedDate ? new Date(selectedDate) : new Date()
  const [viewDate, setViewDate] = useState(initialDate)

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => {
    const d = new Date(year, month, 1).getDay()
    return d === 0 ? 6 : d - 1
  }

  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth())
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth())

  const prevMonth = () => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))
  const nextMonth = () => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))

  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear()
  }

  const isSelected = (day) => {
    if (!selectedDate) return false
    const d = new Date(selectedDate)
    // Compare year, month, day locally to avoid TZ issues
    return day === d.getDate() && viewDate.getMonth() === d.getMonth() && viewDate.getFullYear() === d.getFullYear()
  }

  const hasMissions = (day) => {
    const currentMissions = missions || []
    const y = viewDate.getFullYear()
    const m = (viewDate.getMonth() + 1).toString().padStart(2, '0')
    const d = day.toString().padStart(2, '0')
    const dateStr = `${y}-${m}-${d}` // Format as YYYY-MM-DD local
    return currentMissions.some(m => m.dueDate === dateStr)
  }

  return (
    <div className="bg-slate-50 p-4 rounded-[2rem] border-2 border-slate-100">
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-tighter">
          {viewDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
        </h4>
        <div className="flex gap-1">
          <button type="button" onClick={prevMonth} className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-slate-100 text-slate-400"><ChevronLeft size={16}/></button>
          <button type="button" onClick={nextMonth} className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-slate-100 text-slate-400"><ChevronRight size={16}/></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(d => (
          <div key={d} className="text-[8px] font-black text-slate-300 text-center uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          const active = hasMissions(day)
          const selected = isSelected(day)
          const today = isToday(day)

          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                const y = viewDate.getFullYear()
                const m = (viewDate.getMonth() + 1).toString().padStart(2, '0')
                const d = day.toString().padStart(2, '0')
                onSelect(`${y}-${m}-${d}`) // Send YYYY-MM-DD local string
              }}
              className={`h-8 sm:h-9 rounded-xl font-black text-[11px] transition-all flex items-center justify-center border-2 ${
                selected 
                  ? 'bg-tertiary text-white border-white shadow-md z-10' 
                  : today
                    ? 'bg-primary/10 border-primary/20 text-primary'
                    : active
                      ? 'bg-white border-orange-400/30 text-orange-600'
                      : 'bg-white border-transparent text-slate-400 hover:border-slate-200'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
