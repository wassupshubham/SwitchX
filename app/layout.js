import React from 'react';
import '../src/frontend/globals.css';
import ErrorHealer from '../src/frontend/components/ErrorHealer';

export const metadata = {
  title: 'Launchpad Multi-Agent Studio',
  description: 'Autonomous Startup Strategy & Interface Emulator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body 
        className="antialiased bg-[#020205]" 
        suppressHydrationWarning={true}
      >
        <ErrorHealer>
          {children}
        </ErrorHealer>
      </body>
    </html>
  );
}