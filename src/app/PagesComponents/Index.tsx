"use client";

import Head from 'next/head';
import { useTheme } from '../components/ThemeProvider';
import { CounterList } from '../components/CounterList';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <style>
          {`
            .font-display {
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 600;
              letter-spacing: -0.02em;
            }
            body {
              font-family: 'Inter', sans-serif;
              font-weight: 400;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Space Grotesk', sans-serif;
            }
          `}
        </style>
      </Head>
      <CounterList />
    </>
  );
};

export default Index;