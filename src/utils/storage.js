/**
 * Homework Hero - Storage Utility
 * Manages local persistence for user data and missions.
 */

const STORAGE_KEYS = {
  USER: 'homework_hero_user',
  MISSIONS: 'homework_hero_missions',
  SETTINGS: 'homework_hero_settings'
};

export const storage = {
  // User Profile
  getUser: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  setUser: (userData) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  },

  // Missions
  getMissions: () => {
    const data = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    let missions = data ? JSON.parse(data) : [];
    
    // Auto-cleanup: Remove completed missions older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const filteredMissions = missions.filter(m => {
      if (m.completed && new Date(m.dueDate + "T00:00:00") < thirtyDaysAgo) return false;
      return true;
    });

    if (filteredMissions.length !== missions.length) {
      storage.saveMissions(filteredMissions);
      missions = filteredMissions;
    }
    
    return missions;
  },
  saveMissions: (missions) => {
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
  },

  // Generic
  clearAll: () => {
    localStorage.clear();
    window.location.reload();
  }
};

/**
 * Groups missions by status or date if needed in the future.
 */
export const groupMissions = (missions) => {
  const active = missions.filter(m => !m.completed);
  const completed = missions.filter(m => m.completed);
  return { active, completed };
};
