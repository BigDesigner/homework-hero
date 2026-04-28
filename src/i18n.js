import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'tr', // Force Turkish as default
    fallbackLng: 'tr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      tr: {
        translation: {
          "app_name": "Ödev Kahramanı",
          "welcome": "Hoş Geldin Kahraman!",
          "nickname": "Kahraman Adın",
          "choose_avatar": "Avatarını Seç",
          "lets_go": "Maceraya Başla! 🚀",
          "nav": {
            "tasks": "Görevler",
            "calendar": "Takvim",
            "badges": "Kupalar",
            "settings": "Ayarlar",
            "archive": "Biten Görevler",
            "streak_days": "{{count}} Gün"
          },
          "onboarding": {
            "welcome": "Hoş Geldin Kahraman!",
            "sub": "Görevlerini takip et, kupaları topla ve seviye atla!",
            "nickname": "Kahraman Adın",
            "choose_avatar": "Avatarını Seç",
            "start": "Maceraya Başla! 🚀"
          },
          "dashboard": {
            "level": "Seviye {{level}} Çaylak",
            "power_bar": "Günlük Güç",
            "tasks_completed": "GÖREV TAMAMLANDI",
            "quick_badges": "Kupa Odası",
            "streak": "Seri",
            "new_task": "Yeni Görev",
            "active_tasks": "Aktif Görevler 🚀",
            "completed_tasks": "Biten Görevler 🏆",
            "completed_label": "Tamamlandı!",
            "no_active": "Henüz aktif bir görev yok!",
            "no_completed": "Henüz biten bir görev yok!",
            "add_sub": "Yeni bir görev ekleyerek gücünü artırabilirsin.",
            "completed_sub": "Görevlerini tamamladıkça burası kupalarla dolacak!"
          },
          "status": {
            "completed": "Harika bir iş çıkardın! ✨",
            "overdue": "Eyvah, süresi geçmiş! ⏰",
            "today": "Son gün! Bugün bitirmelisin! 🔥",
            "tomorrow": "Sadece 1 günün kaldı! ⏳",
            "days_left": "{{count}} günün var, yapabilirsin! 💪",
            "plenty_time": "{{count}} gün kaldı, vaktin var! ✨"
          },
          "badges_data": {
            "starter_name": "Başlangıç",
            "starter_sub": "Bitirilen Görevler",
            "math_name": "Sayı Ustası",
            "math_sub": "Matematik Görevi",
            "turkish_name": "Kitap Kurdu",
            "turkish_sub": "Türkçe Görevi",
            "science_name": "Kaşif",
            "science_sub": "Fen Görevi",
            "art_name": "Küçük Sanatçı",
            "art_sub": "Sanat Görevi",
            "sport_name": "Şampiyon Sporcu",
            "sport_sub": "Beden Eğitimi",
            "fast_name": "Hızlı Işık",
            "fast_sub": "Eklendiği gün biten",
            "early_name": "Erken Kalkan",
            "early_sub": "Sabah bitirilenler",
            "night_name": "Gece Savaşçısı",
            "night_sub": "Akşam bitirilenler",
            "weekend_name": "Hafta Sonu Hero",
            "weekend_sub": "Cmt/Pazar çalışan",
            "warrior_name": "Görev Savaşçısı",
            "warrior_sub": "10 Görev Barajı",
            "clean_name": "Tertemiz",
            "clean_sub": "Tüm görevler bitti",
            "footer_tip": "Her görev seni daha büyük bir şampiyon yapar! 🏆⚡"
          },
          "subjects": {
            "mat": "Matematik",
            "tur": "Türkçe",
            "sci": "Fen Bilimleri",
            "soc": "Sosyal Bilgiler",
            "eng": "İngilizce",
            "art": "Görsel Sanatlar",
            "mus": "Müzik",
            "pe": "Beden Eğitimi",
            "rel": "Din Kültürü",
            "other": "Diğer"
          },
          "modal": {
            "edit_title": "Görevi Düzenle",
            "new_title": "Yeni Görev",
            "what_to_do": "Ne yapacaksın?",
            "which_subject": "Hangi Ders?",
            "due_date": "Ne Zaman Bitiyor?",
            "save": "Değişiklikleri Kaydet ✨",
            "create": "Görevi Oluştur! 🚀",
            "title_placeholder": "Örn: Matematik sayfa 42",
            "error_title": "Başlık en az 3 karakter olmalı!",
            "error_date": "Lütfen bir tarih seç!"
          },
          "settings": {
            "theme_title": "Tema",
            "theme_blue": "Mavi",
            "theme_pink": "Pembe",
            "language_title": "Dil Seçimi",
            "cloud_title": "Bulut Senkronizasyonu",
            "cloud_connect": "Google Drive ile Bağlan",
            "cloud_connected": "Google Hesabı Bağlı",
            "cloud_disconnect": "Bağlantıyı Kes",
            "sync_now": "Şimdi Senkronize Et",
            "login_error": "Giriş yapılamadı. Tekrar deneyin.",
            "coming_soon": "Çok Yakında! 🚀",
            "reset_data": "HER ŞEYİ SIFIRLA"
          },
          "common": {
            "confirm_delete": "Bu işlemi yapmak istediğine emin misin? Bu işlem geri alınamaz! 🗑️"
          }
        }
      },
      en: {
        translation: {
          "app_name": "Homework Hero",
          "welcome": "Welcome Hero!",
          "nickname": "Hero Nickname",
          "choose_avatar": "Choose Your Avatar",
          "lets_go": "Start Adventure! 🚀",
          "nav": {
            "tasks": "Tasks",
            "calendar": "Calendar",
            "badges": "Trophies",
            "settings": "Settings",
            "archive": "Finished Tasks",
            "streak_days": "{{count}} Days"
          },
          "onboarding": {
            "welcome": "Welcome Hero!",
            "sub": "Track your tasks, collect trophies and level up!",
            "nickname": "Hero Name",
            "choose_avatar": "Choose Your Avatar",
            "start": "Start Adventure! 🚀"
          },
          "dashboard": {
            "level": "Level {{level}} Rookie",
            "power_bar": "Daily Power",
            "tasks_completed": "TASKS COMPLETED",
            "quick_badges": "Trophy Room",
            "streak": "Streak",
            "new_task": "New Task",
            "active_tasks": "Active Tasks 🚀",
            "completed_tasks": "Finished Tasks 🏆",
            "completed_label": "Finished!",
            "no_active": "No active tasks yet!",
            "no_completed": "No finished tasks yet!",
            "add_sub": "Add a new task to increase your power.",
            "completed_sub": "Complete tasks to fill this room with trophies!"
          },
          "status": {
            "completed": "Great job! You did it! ✨",
            "overdue": "Oops, it's overdue! ⏰",
            "today": "Last day! Finish it today! 🔥",
            "tomorrow": "Only 1 day left! ⏳",
            "days_left": "{{count}} days left, you can do it! 💪",
            "plenty_time": "{{count}} days left, plenty of time! ✨"
          },
          "badges_data": {
            "starter_name": "Getting Started",
            "starter_sub": "Finished Tasks",
            "math_name": "Number Master",
            "math_sub": "Math Task",
            "turkish_name": "Bookworm",
            "turkish_sub": "English Task",
            "science_name": "Explorer",
            "science_sub": "Science Task",
            "art_name": "Little Artist",
            "art_sub": "Art Task",
            "sport_name": "Champion Athlete",
            "sport_sub": "Physical Ed.",
            "fast_name": "Fast Light",
            "fast_sub": "Finished on same day",
            "early_name": "Early Bird",
            "early_sub": "Finished in morning",
            "night_name": "Night Warrior",
            "night_sub": "Finished at night",
            "weekend_name": "Weekend Hero",
            "weekend_sub": "Working on Sat/Sun",
            "warrior_name": "Task Warrior",
            "warrior_sub": "10 Task Milestone",
            "clean_name": "Squeaky Clean",
            "clean_sub": "All tasks finished",
            "footer_tip": "Every task makes you a bigger champion! 🏆⚡"
          },
          "subjects": {
            "mat": "Mathematics",
            "tur": "English",
            "sci": "Science",
            "soc": "Social Studies",
            "eng": "English Language",
            "art": "Visual Arts",
            "mus": "Music",
            "pe": "Physical Education",
            "rel": "Religion",
            "other": "Other"
          },
          "modal": {
            "edit_title": "Edit Task",
            "new_title": "New Task",
            "what_to_do": "What to do?",
            "which_subject": "Which Subject?",
            "due_date": "When is it due?",
            "save": "Save Changes ✨",
            "create": "Create Task! 🚀",
            "title_placeholder": "e.g. Math page 42",
            "error_title": "Title must be at least 3 characters!",
            "error_date": "Please select a date!"
          },
          "settings": {
            "theme_title": "Theme",
            "theme_blue": "Blue",
            "theme_pink": "Pink",
            "language_title": "Language",
            "cloud_title": "Cloud Sync",
            "cloud_connect": "Connect with Google Drive",
            "cloud_connected": "Google Account Connected",
            "cloud_disconnect": "Disconnect",
            "sync_now": "Sync Now",
            "login_error": "Failed to login. Please try again.",
            "coming_soon": "Coming Soon! 🚀",
            "reset_data": "RESET ALL DATA"
          },
          "common": {
            "confirm_delete": "Are you sure you want to do this? This cannot be undone! 🗑️"
          }
        }
      }
    }
  });

export default i18n;
