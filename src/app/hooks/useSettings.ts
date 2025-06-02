"use client";

import { useLocalStorage } from './useLocalStorage';
import { AppSettings } from '../types/counter';

const defaultSettings: AppSettings = {
  soundEnabled: true,
  theme: 'system',
  vibrationEnabled: true,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('tally-settings', defaultSettings);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const playIncrementSound = () => {
    if (settings.soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Higher, more positive tone for increment
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        console.error('Failed to play sound:', error);
      }
    }
  };

  const playDecrementSound = () => {
    if (settings.soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Lower, more negative tone for decrement
        oscillator.frequency.value = 1200;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        console.error('Failed to play sound:', error);
      }
    }
  };

  const vibrate = () => {
    if (settings.vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return {
    settings,
    updateSettings,
    playIncrementSound,
    playDecrementSound,
    vibrate,
  };
}