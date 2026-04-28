/**
 * Homework Hero - Notification Service
 * Manages local browser notifications for homework deadlines.
 */

import { soundService } from './soundService'

export const notificationService = {
  // Request permission from the user
  requestPermission: async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return false;
    }

    if (Notification.permission === 'granted') return true;

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  },

  // Show a notification
  sendNotification: (title, body) => {
    if (Notification.permission === 'granted') {
      soundService.playHeroicDing();
      new Notification(title, {
        body,
        icon: '/favicon.ico', // You can replace this with a hero icon later
        badge: '/favicon.ico',
        tag: 'homework-hero-alert'
      });
    }
  },

  // Check missions and trigger notifications for upcoming deadlines
  checkUpcomingMissions: (missions) => {
    const today = new Date().setHours(0, 0, 0, 0);
    
    missions.forEach(mission => {
      if (mission.completed) return;

      const due = new Date(mission.dueDate + "T00:00:00").setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        notificationService.sendNotification(
          '🔥 BUGÜN SON GÜN!',
          `"${mission.title}" ödevini bugün mutlaka bitirmelisin kahraman!`
        );
      } else if (diffDays === 1) {
        notificationService.sendNotification(
          '⏳ SADECE 1 GÜN KALDI!',
          `"${mission.title}" için vaktin daralıyor, yarın son gün!`
        );
      } else if (diffDays === 2) {
        notificationService.sendNotification(
          '🕰️ 2 GÜNÜN VAR',
          `"${mission.title}" ödevini halletmek için hala vaktin var.`
        );
      }
    });
  }
};
