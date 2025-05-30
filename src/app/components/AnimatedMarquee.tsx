// components/ui/AnimatedMarquee.tsx
'use client';

import React from 'react';

interface MarqueeItem {
  text: string;
  color: string;
}

interface AnimatedMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const AnimatedMarquee: React.FC<AnimatedMarqueeProps> = ({
  items,
  direction = 'left',
  speed = 'normal',
  className = '',
}) => {
  // Duplicate items for seamless looping
  const duplicatedItems = [...items, ...items, ...items];
  
  const speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  };

  const directionClass = (direction === 'right') ? 'animate-marquee-reverse' : '';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex ${speedClasses[speed]} ${directionClass}`}>
        {duplicatedItems.map((item, index) => (
          <MarqueeWord 
            key={`${item.text}-${index}`}
            text={item.text}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

const MarqueeWord: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  // Create a gradient from the base color to a slightly darker version
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${color}, ${adjustColor(color, -20)})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <span 
      className="text-6xl font-bold mx-8 font-display"
      style={gradientStyle}
    >
      {text}
    </span>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Convert hex to RGB
  let useColor = color.startsWith('#') ? color.slice(1) : color;
  let r = parseInt(useColor.substring(0, 2), 16);
  let g = parseInt(useColor.substring(2, 4), 16);
  let b = parseInt(useColor.substring(4, 6), 16);

  // Adjust brightness
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}