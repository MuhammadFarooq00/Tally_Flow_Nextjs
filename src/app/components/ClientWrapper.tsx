'use client';

import { useEffect } from 'react';

export function ClientWrapper() {
   useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
   
      .animated-bg-dark {
        background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
        background-size: 400% 400%;
        // animation: gradient 15s ease infinite;
      }
      .animated-bg-light {
        background: linear-gradient(-45deg, #f8f9fa, #e9ecef, #dee2e6, #e9ecef);
        background-size: 400% 400%;
        // animation: gradient 15s ease infinite;
      }
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .glow-button {
        box-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
      }
      .glow-button:hover {
        box-shadow: 0 0 25px rgba(74, 222, 128, 0.6);
      }
      .glass-effect {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
      }
      .counter-shadow {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 
                    0 5px 10px -5px rgba(0, 0, 0, 0.04),
                    0 0 0 1px rgba(255, 255, 255, 0.1);
      }
      .animate-glow-pulse {
        animation: glow-pulse 2s infinite;
      }
      @keyframes glow-pulse {
        0% { box-shadow: 0 0 10px rgba(74, 222, 128, 0.2); }
        50% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.5); }
        100% { box-shadow: 0 0 10px rgba(74, 222, 128, 0.2); }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      @keyframes bounce-in {
        0% { transform: scale(0.8); opacity: 0; }
        70% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-bounce-in {
        animation: bounce-in 0.6s ease-out;
      }
      @keyframes fade-in-scale {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      .animate-fade-in-scale {
        animation: fade-in-scale 0.4s ease-out;
      }
      
      /* Beautiful Scrollbars */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05); 
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(129, 140, 248, 0.5); 
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(129, 140, 248, 0.7); 
      }
      
      /* Theme specific styles */
      .light {
        color-scheme: light;
      }
      
      .dark {
        color-scheme: dark;
      }
      
      
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
