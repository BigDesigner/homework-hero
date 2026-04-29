import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Settings, Trophy, Zap, LayoutDashboard, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { storage } from './utils/storage'
import Onboarding from './components/Onboarding'
import MissionCard from './components/MissionCard'
import AddMissionModal from './components/AddMissionModal'
import TrophyModal, { TROPHIES } from './components/TrophyModal'
import SettingsModal from './components/SettingsModal'
import CalendarModal from './components/CalendarModal'
import { notificationService } from './utils/notificationService'
import { soundService } from './utils/soundService'
import { driveService } from './utils/googleDriveService'
import { Toast } from '@capacitor/toast'

function App() {
  const { t, i18n } = useTranslation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [missions, setMissions] = useState([])
  const [filter, setFilter] = useState('active') // 'active' or 'completed'
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isTrophiesOpen, setIsTrophiesOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [editingMission, setEditingMission] = useState(null)

  const applyTheme = (theme) => {
    const root = document.documentElement
    if (theme === 'pink') {
      root.style.setProperty('--primary-color', '#f472b6')
      root.style.setProperty('--primary-dark-color', '#be185d')
      root.style.setProperty('--primary-glow', 'rgba(244, 114, 182, 0.4)')
    } else {
      root.style.setProperty('--primary-color', '#5da9e9')
      root.style.setProperty('--primary-dark-color', '#00639a')
      root.style.setProperty('--primary-glow', 'rgba(93, 169, 233, 0.4)')
    }
  }

  const initNotifications = (currentMissions) => {
    notificationService.requestPermission().then(granted => {
      if (granted) {
        notificationService.checkUpcomingMissions(currentMissions || [])
      }
    })
  }

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    const savedUser = storage.getUser()
    const savedMissions = storage.getMissions()
    
    if (savedUser) {
      setUser(savedUser)
      applyTheme(savedUser.theme || 'blue')
      initNotifications(savedMissions)
    }
    if (savedMissions) setMissions(savedMissions)
    
    // Initialize Google Auth for Web support
    import('./utils/googleAuthService').then(({ googleAuthService }) => {
      googleAuthService.initialize();
    });

    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      storage.saveMissions(missions)
    }
  }, [missions, loading])

  const handleOnboardingComplete = (userData) => {
    storage.setUser(userData)
    setUser(userData)
    applyTheme(userData.theme || 'blue')
    initNotifications(missions)
  }

  const updateUserInfo = (newData) => {
    storage.setUser(newData)
    setUser(newData)
    if (newData.theme) applyTheme(newData.theme)
  }

  const handleSync = async () => {
    if (!user?.googleUser?.accessToken) {
      const keys = user?.googleUser ? Object.keys(user.googleUser).join(', ') : 'yok';
      const hasAuthCode = user?.googleUser?.serverAuthCode ? "VAR" : "YOK";
      await Toast.show({ 
        text: `Hata: accessToken eksik. Veriler: ${keys} | serverAuthCode: ${hasAuthCode}`, 
        duration: 'long' 
      });
      return false;
    }
    
    const localData = {
      user: {
        nickname: user.nickname,
        avatarId: user.avatarId,
        theme: user.theme,
        unlockedTrophies: user.unlockedTrophies || {}
      },
      missions: missions
    };
    
    const result = await driveService.syncData(localData, user.googleUser.accessToken);
    
    const syncTime = new Date().toLocaleTimeString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    
    if (result.success && result.data) {
      setMissions(result.data.missions);
      
      setUser(prev => {
        const newUser = { 
          ...prev, 
          ...(result.data.user || {}),
          lastSync: syncTime,
          syncError: null
        };
        setTimeout(() => storage.setUser(newUser), 0);
        if (newUser.theme) applyTheme(newUser.theme);
        return newUser; 
      });
      
      soundService.playTada();
      await Toast.show({ text: t('settings.sync_success'), duration: 'short' });
      return true;
    } else {
      const errorMsg = result.error || t('settings.sync_failed');
      setUser(prev => {
        const newUser = { ...prev, syncError: errorMsg, lastSync: syncTime };
        setTimeout(() => storage.setUser(newUser), 0);
        return newUser;
      });
      await Toast.show({ text: "Hata: " + errorMsg, duration: 'long' });
      return false;
    }
  }

  // Persistent Trophy Logic - Robust implementation with deferred storage
  useEffect(() => {
    if (!loading) {
      setUser(prev => {
        if (!prev) return prev;
        
        const currentUnlocked = { ...(prev.unlockedTrophies || {}) };
        let hasNewChange = false;
        
        TROPHIES.forEach(trophy => {
          const count = trophy.count(missions);
          if (count > (currentUnlocked[trophy.id] || 0)) {
            currentUnlocked[trophy.id] = count;
            hasNewChange = true;
          }
        });
        
        if (hasNewChange) {
          const updatedUser = { ...prev, unlockedTrophies: currentUnlocked };
          setTimeout(() => storage.setUser(updatedUser), 0);
          return updatedUser;
        }
        return prev;
      });
    }
  }, [missions, loading]);

  const addMission = (newMission) => {
    if (newMission.id) {
      setMissions(missions.map(m => m.id === newMission.id ? newMission : m))
    } else {
      setMissions([...missions, { 
        ...newMission, 
        id: Date.now(), 
        createdAt: new Date().toISOString() 
      }])
    }
    setEditingMission(null)
  }

  const handleEdit = (mission) => {
    setEditingMission(mission)
    setIsAddModalOpen(true)
  }

  const toggleMission = (id) => {
    let isNowCompleted = false
    setMissions(missions.map(m => {
      if (m.id === id) {
        isNowCompleted = !m.completed
        return { 
          ...m, 
          completed: !m.completed, 
          completedAt: !m.completed ? new Date().toISOString() : null 
        }
      }
      return m
    }))
    if (isNowCompleted) soundService.playTada()
  }

  const deleteMission = (id) => {
    setMissions(missions.filter(m => m.id !== id))
  }

  const completedCount = useMemo(() => missions.filter(m => m.completed).length, [missions])
  const progressPercent = useMemo(() => missions.length > 0 ? (completedCount / missions.length) * 100 : 0, [missions, completedCount])
  const unlockedTrophiesCount = useMemo(() => TROPHIES.filter(t => t.count(missions) > 0).length, [missions])
  const totalTrophiesCount = TROPHIES.length

  const streakCount = useMemo(() => {
    const completedDates = [...new Set(missions
      .filter(m => m.completed && m.completedAt)
      .map(m => new Date(m.completedAt).toDateString())
    )].map(d => new Date(d)).sort((a, b) => b - a)
    if (completedDates.length === 0) return 0
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const lastDate = new Date(completedDates[0])
    lastDate.setHours(0, 0, 0, 0)
    const diffDays = (currentDate - lastDate) / (1000 * 60 * 60 * 24)
    if (diffDays > 1) return 0
    for (let i = 0; i < completedDates.length; i++) {
      const d = new Date(completedDates[i])
      d.setHours(0, 0, 0, 0)
      const expectedDate = new Date(lastDate)
      expectedDate.setDate(lastDate.getDate() - i)
      if (d.getTime() === expectedDate.getTime()) streak++
      else break
    }
    return streak
  }, [missions])

  const filteredMissions = useMemo(() => {
    return missions
      .filter(m => filter === 'active' ? !m.completed : m.completed)
      .sort((a, b) => {
        if (filter === 'active') return new Date(a.dueDate + "T00:00:00") - new Date(b.dueDate + "T00:00:00")
        return b.id - a.id
      })
  }, [missions, filter])

  if (loading) return null
  if (!user) return <Onboarding onComplete={handleOnboardingComplete} />

  return (
    <div className="min-h-screen bg-surface font-lexend text-slate-800 pb-24 sm:pb-12">
      {/* Desktop Header */}
      <nav className="bg-white border-b-4 border-slate-100 px-6 py-4 sticky top-0 z-40 hidden sm:block">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Zap size={24} strokeWidth={3} />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight italic">{t('app_name')}</h1>
          </div>
          
          <div className="flex items-center gap-4 bg-surface p-1.5 rounded-2xl border-2 border-slate-100">
             <button className="bg-white text-primary px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-2 font-black text-sm">
                <LayoutDashboard size={18} strokeWidth={3} />
                <span>{t('nav.tasks')}</span>
             </button>
             <button onClick={() => setIsCalendarOpen(true)} className="text-slate-400 px-6 py-2.5 rounded-xl flex items-center gap-2 font-black text-sm hover:text-primary transition-colors">
                <CalendarIcon size={18} strokeWidth={3} />
                <span>{t('nav.calendar')}</span>
             </button>
             <button onClick={() => setIsTrophiesOpen(true)} className="text-slate-400 px-6 py-2.5 rounded-xl flex items-center gap-2 font-black text-sm hover:text-primary transition-colors">
                <Trophy size={18} strokeWidth={3} />
                <span>{t('nav.badges')}</span>
             </button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 font-black text-sm transition-all hover:scale-105 active:scale-95">
              <Plus size={18} strokeWidth={3} />
              <span>{t('dashboard.new_task')}</span>
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="bg-white p-3 rounded-xl border-2 border-slate-50 text-slate-300 hover:text-primary transition-colors shadow-sm">
              <Settings size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Header (Simplified) */}
      <header className="sm:hidden bg-white border-b-4 border-slate-100 px-6 py-4 flex items-center justify-center sticky top-0 z-40" style={{ paddingTop: 'calc(var(--safe-area-top) + 1rem)' }}>
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-primary" strokeWidth={3} />
          <h1 className="text-lg font-black text-slate-800 tracking-tight italic">{t('app_name')}</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-soft border-b-4 border-primary/10 relative overflow-hidden">
              <div className="flex lg:flex-col items-center lg:text-center gap-4 lg:gap-0 relative z-10">
                <div className="w-20 h-20 lg:w-28 lg:h-28 bg-surface rounded-[2rem] flex items-center justify-center text-4xl lg:text-6xl lg:mb-4 border-4 border-white shadow-xl">
                  {user.avatarId === 1 ? '🦊' : 
                   user.avatarId === 2 ? '🐼' : 
                   user.avatarId === 3 ? '🦁' : 
                   user.avatarId === 4 ? '🤖' : 
                   user.avatarId === 5 ? '🚀' : 
                   user.avatarId === 6 ? '🐱' : 
                   user.avatarId === 7 ? '🐶' : 
                   user.avatarId === 8 ? '🦄' : 
                   user.avatarId === 9 ? '🐉' : 
                   user.avatarId === 10 ? '👾' : 
                   user.avatarId === 11 ? '🦸' : 
                   user.avatarId === 12 ? '🧙' : '👤'}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">{user.nickname}</h2>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mt-1">
                    {t('dashboard.level', { level: Math.floor(completedCount / 5) + 1 })}
                  </span>
                </div>
              </div>
              <div className="w-full mt-8 space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Zap size={10} className="text-primary fill-primary" /> {t('dashboard.power_bar')}
                  </span>
                  <span className="text-primary font-black text-xs">%{Math.round(progressPercent)}</span>
                </div>
                <div className="h-4 bg-slate-50 rounded-full overflow-hidden border-2 border-slate-100 p-0.5">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%`, boxShadow: '0 0 12px var(--primary-glow)' }} />
                </div>
              </div>
            </div>
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-1 gap-4">
               <button onClick={() => setIsTrophiesOpen(true)} className="bg-white p-5 rounded-[2rem] shadow-soft border-b-4 border-secondary/20 flex items-center gap-4 text-left hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                    <Trophy size={24} />
                  </div>
                  <div><p className="text-sm font-black text-slate-700">{unlockedTrophiesCount}/{totalTrophiesCount} {t('nav.badges')}</p></div>
               </button>
               <div className="bg-white p-5 rounded-[2rem] shadow-soft border-b-4 border-tertiary/20 flex items-center gap-4">
                  <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('dashboard.streak')}</p>
                    <p className="text-base font-black text-slate-700">{streakCount > 0 ? t('nav.streak_days', { count: streakCount }) + ' 🔥' : '0'}</p>
                  </div>
               </div>
            </div>
          </aside>

          <section className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-[1.5rem] border-2 border-slate-50 w-full shadow-sm overflow-hidden">
              <button onClick={() => setFilter('active')} className={`flex-1 px-4 sm:px-8 py-3 rounded-xl font-black text-[10px] sm:text-xs transition-all uppercase tracking-widest ${filter === 'active' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                {t('dashboard.active_tasks')}
              </button>
              <button onClick={() => setFilter('completed')} className={`flex-1 px-4 sm:px-8 py-3 rounded-xl font-black text-[10px] sm:text-xs transition-all uppercase tracking-widest ${filter === 'completed' ? 'bg-tertiary text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                {t('dashboard.completed_tasks')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px] content-start">
              <AnimatePresence mode="popLayout">
                {filteredMissions.length === 0 ? (
                  <div className="col-span-full bg-white/40 border-4 border-dashed border-slate-100 rounded-[3rem] p-20 text-center flex flex-col items-center justify-center space-y-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                      {filter === 'active' ? <LayoutDashboard size={48} /> : <CheckCircle2 size={48} />}
                    </div>
                    <div><p className="text-slate-400 font-black text-xl uppercase tracking-tighter">{filter === 'active' ? t('dashboard.no_active') : t('dashboard.no_completed')}</p></div>
                  </div>
                ) : (
                  filteredMissions.map(mission => (
                    <MissionCard key={mission.id} mission={mission} onToggle={toggleMission} onDelete={deleteMission} onEdit={handleEdit} />
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Premium Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-slate-50 p-3 px-6 sm:hidden flex items-center justify-between z-40 pb-6">
         <button onClick={() => setFilter('active')} className={`flex flex-col items-center gap-1 transition-colors ${filter === 'active' ? 'text-primary' : 'text-slate-300'}`}>
            <LayoutDashboard size={24} strokeWidth={3} />
            <span className="text-[9px] font-black uppercase tracking-widest">{t('nav.tasks')}</span>
         </button>
         <button onClick={() => setIsCalendarOpen(true)} className="flex flex-col items-center gap-1 text-slate-300 hover:text-primary transition-colors">
            <CalendarIcon size={24} />
            <span className="text-[9px] font-black uppercase tracking-widest">{t('nav.calendar')}</span>
         </button>

         {/* Premium Central Add Button */}
         <div className="relative -mt-12">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-16 h-16 bg-primary text-white rounded-2xl shadow-[0_8px_20px_var(--primary-glow)] flex items-center justify-center transition-transform active:scale-90 border-4 border-white"
            >
              <Plus size={36} strokeWidth={4} />
            </button>
         </div>

         <button onClick={() => setIsTrophiesOpen(true)} className="flex flex-col items-center gap-1 text-slate-300 hover:text-primary transition-colors">
            <Trophy size={24} />
            <span className="text-[9px] font-black uppercase tracking-widest">{t('nav.badges')}</span>
         </button>
         <button onClick={() => setIsSettingsOpen(true)} className="flex flex-col items-center gap-1 text-slate-300 hover:text-primary transition-colors">
            <Settings size={24} />
            <span className="text-[9px] font-black uppercase tracking-widest">{t('nav.settings')}</span>
         </button>
      </footer>

      <AddMissionModal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); setEditingMission(null); }} onAdd={addMission} editingMission={editingMission} missions={missions} />
      <TrophyModal isOpen={isTrophiesOpen} onClose={() => setIsTrophiesOpen(false)} missions={missions} t={t} user={user} />
      <SettingsModal key={user?.lastSync || 'initial'} isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} user={user} onUpdateUser={updateUserInfo} onSync={handleSync} />
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} missions={missions} />
    </div>
  )
}

export default App
