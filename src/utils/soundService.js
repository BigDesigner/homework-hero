/**
 * Homework Hero - Sound Service
 * Generates heroic and playful sound effects using Web Audio API.
 * No external MP3 files needed!
 */

export const soundService = {
  // A magical "Ding" sound for success or notifications
  playHeroicDing: () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine'; // Soft, rounded sound
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    // The "Magic Ding" frequency pattern (Two notes)
    oscillator.frequency.setValueAtTime(523.25, now); // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1); // C6

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    oscillator.start(now);
    oscillator.stop(now + 0.5);
  },

  // A slightly more urgent alert sound
  playAlert: () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle'; // More distinct, urgent sound
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    // Pattern: High to low slide
    oscillator.frequency.setValueAtTime(880, now); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.2); // A4

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    oscillator.start(now);
    oscillator.stop(now + 0.4);
  },

  // A celebratory "Ta-da!" sound for big achievements
  playTada: () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playNote = (freq, start, duration) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, start);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.05, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.start(start);
      osc.stop(start + duration);
    };

    const now = audioCtx.currentTime;
    playNote(523.25, now, 0.1); // C5
    playNote(659.25, now + 0.1, 0.1); // E5
    playNote(783.99, now + 0.2, 0.3); // G5
  }
};
