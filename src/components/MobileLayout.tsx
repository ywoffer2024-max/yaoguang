import React, { ReactNode } from 'react';
import cloudDecoration from '@/assets/cloud-decoration.png';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showTopClouds?: boolean;
  showBottomClouds?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  className = '',
  showTopClouds = false,
  showBottomClouds = false,
}) => {
  return (
    <div className="min-h-screen bg-background bg-pattern">
      <div className={`mobile-container relative overflow-hidden ${className}`}>
        {/* Top left cloud decoration */}
        {showTopClouds && (
          <div className="absolute top-20 -left-16 w-48 h-48 opacity-60 pointer-events-none">
            <img 
              src={cloudDecoration} 
              alt="" 
              className="w-full h-full object-contain"
              style={{ filter: 'hue-rotate(140deg) saturate(0.7)' }}
            />
          </div>
        )}
        
        {/* Top right bamboo decoration - using CSS */}
        {showTopClouds && (
          <div className="absolute top-16 right-4 w-20 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 200" className="w-full h-auto text-brand-gold">
              <path d="M50 0 L50 200" stroke="currentColor" strokeWidth="3" />
              <path d="M50 30 L70 15 M50 60 L75 45 M50 90 L70 75 M50 120 L75 105" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}

        {/* Bottom right cloud decoration */}
        {showBottomClouds && (
          <div className="absolute bottom-0 -right-12 w-56 h-56 opacity-50 pointer-events-none">
            <img 
              src={cloudDecoration} 
              alt="" 
              className="w-full h-full object-contain transform scale-x-[-1]"
              style={{ filter: 'hue-rotate(140deg) saturate(0.7)' }}
            />
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};
