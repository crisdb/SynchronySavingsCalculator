// CMS Integration Example:
//     <div id="product-hys-rate-component" data-mode="favorable"></div>



    import React, { useState, useEffect } from 'react';
import HYSFavorable from './HYSFavorable';
import HYSLessFavorable from './HYSLessFavorable';
import HYSFavorableMobile from './HYSFavorableMobile';
import HYSLessFavorableMobile from './HYSLessFavorableMobile';

const RATE_THRESHOLD = 4.0; // 4% or below is unfavorable

const HYSCalculator = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mode, setMode] = useState('unfavorable'); // Default mode

  // Check CMS div for manual mode override on component mount
  useEffect(() => {
    const container = document.getElementById('product-hys-rate-component');
    if (container) {
      const manualMode = container.getAttribute('data-mode');
      if (manualMode) {
        setMode(manualMode); // Use manual override
        return; // Skip API logic if manually set
      }
    }

    // If no manual override, fetch rate from API
    fetchRateFromAPI();
  }, []);

  // Handle mobile/desktop switching based on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch rate from API and decide mode based on threshold
  const fetchRateFromAPI = async () => {
    try {
      const response = await fetch('/api/rates'); // Replace with actual API endpoint
      const data = await response.json();
      const rate = data.currentRate || 0; // Extract relevant rate

      // Determine if favorable or unfavorable
      setMode(rate > RATE_THRESHOLD ? 'favorable' : 'unfavorable');
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      setMode('unfavorable'); // Default to unfavorable on error
    }
  };

  // Render appropriate content based on mode and layout
  const renderContent = () => {
    if (isMobile) {
      return mode === 'favorable' ? <HYSFavorableMobile /> : <HYSLessFavorableMobile />;
    }
    return mode === 'favorable' ? <HYSFavorable /> : <HYSLessFavorable />;
  };

  return <div className="hys-calculator">{renderContent()}</div>;
};

export default HYSCalculator;
