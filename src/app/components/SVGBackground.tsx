import React from "react";

// A beautiful SVG background animation with glowing, spreading counter-like shapes
const SVGBackground: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
    aria-hidden="true"
  >
    {/* Glowing counter-like circles */}
    <g>
      <circle cx="350" cy="250" r="90" fill="url(#glow1)" opacity="0.22">
        <animate attributeName="cx" values="350;600;350" dur="12s" repeatCount="indefinite" />
        <animate attributeName="cy" values="250;400;250" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle cx="1700" cy="800" r="140" fill="url(#glow2)" opacity="0.18">
        <animate attributeName="cy" values="800;950;800" dur="14s" repeatCount="indefinite" />
        <animate attributeName="cx" values="1700;1500;1700" dur="11s" repeatCount="indefinite" />
      </circle>
      <circle cx="900" cy="200" r="60" fill="url(#glow3)" opacity="0.16">
        <animate attributeName="cy" values="200;350;200" dur="9s" repeatCount="indefinite" />
      </circle>
      <circle cx="1200" cy="900" r="100" fill="url(#glow4)" opacity="0.14">
        <animate attributeName="cx" values="1200;1350;1200" dur="13s" repeatCount="indefinite" />
        <animate attributeName="cy" values="900;700;900" dur="10s" repeatCount="indefinite" />
      </circle>
      {/* Counter badge-like rectangles */}
      <rect x="600" y="700" width="120" height="60" rx="30" fill="url(#badge1)" opacity="0.13">
        <animate attributeName="x" values="600;900;600" dur="15s" repeatCount="indefinite" />
      </rect>
      <rect x="1450" y="300" width="90" height="90" rx="45" fill="url(#badge2)" opacity="0.11">
        <animate attributeName="y" values="300;500;300" dur="12s" repeatCount="indefinite" />
      </rect>
      {/* Floating plus icons */}
      <g opacity="0.10">
        <g>
          <rect x="400" y="900" width="48" height="48" rx="24" fill="#34d399" />
          <path d="M424 916v16M416 924h16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -40; 0 0" dur="10s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="1550" y="150" width="48" height="48" rx="24" fill="#a78bfa" />
          <path d="M1574 166v16M1566 174h16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 40; 0 0" dur="13s" repeatCount="indefinite" />
        </g>
      </g>
    </g>
    <defs>
      <radialGradient id="glow1" cx="0" cy="0" r="1" gradientTransform="translate(350 250) scale(90)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34d399" stopOpacity="0.8" />
        <stop offset="1" stopColor="#34d399" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glow2" cx="0" cy="0" r="1" gradientTransform="translate(1700 800) scale(140)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" stopOpacity="0.7" />
        <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glow3" cx="0" cy="0" r="1" gradientTransform="translate(900 200) scale(60)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f472b6" stopOpacity="0.7" />
        <stop offset="1" stopColor="#f472b6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glow4" cx="0" cy="0" r="1" gradientTransform="translate(1200 900) scale(100)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" stopOpacity="0.7" />
        <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="badge1" x1="600" y1="700" x2="720" y2="760" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#34d399" />
      </linearGradient>
      <linearGradient id="badge2" x1="1450" y1="300" x2="1540" y2="390" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" />
        <stop offset="1" stopColor="#f472b6" />
      </linearGradient>
    </defs>
  </svg>
);

export default SVGBackground;
