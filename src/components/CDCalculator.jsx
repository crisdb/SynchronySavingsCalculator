// CMS Integration Example:
// <div id="product-cds-rate-component" data-mode="favorable"></div>




import React, { useState, useEffect } from 'react';
import CDFavorable from './CDFavorable';
import CDLessFavorable from './CDLessFavorable';
import CDFavorableMobile from './CDFavorableMobile';
import CDLessFavorableMobile from './CDLessFavorableMobile';

const RATE_THRESHOLD = 4.0; // If the rate is <= 4%, show unfavorable

const CDCalculator = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mode, setMode] = useState('unfavorable'); // Default to unfavorable

    // Check CMS div for manual mode override when the component mounts
    useEffect(() => {
        const container = document.getElementById('product-cds-rate-component');
        if (container) {
            const manualMode = container.getAttribute('data-mode');
            if (manualMode) {
                setMode(manualMode); // Use manual override
                return; // Skip API logic if manually set
            }
        }

        // If no manual mode, fetch rate from API to determine mode
        fetchRateFromAPI();
    }, []);

    // Handle mobile/desktop layout switching on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch rate from API and determine favorable/unfavorable mode
    const fetchRateFromAPI = async () => {
        try {
            const response = await fetch('/api/rates'); // Replace with actual endpoint
            const data = await response.json();
            const rate = data.currentRate || 0; // Get the rate value from the API response

            // Set mode based on the 4% threshold
            setMode(rate > RATE_THRESHOLD ? 'favorable' : 'unfavorable');
        } catch (error) {
            console.error('Failed to fetch rates:', error);
            setMode('unfavorable'); // Default to unfavorable on error
        }
    };

    // Render content based on mode and screen size
    const renderContent = () => {
        if (isMobile) {
            return mode === 'favorable' ? <CDFavorableMobile /> : <CDLessFavorableMobile />;
        }
        return mode === 'favorable' ? <CDFavorable /> : <CDLessFavorable />;
    };

    return (
        <div className="cd-calculator">
            {renderContent()}
        </div>
    );
};

export default CDCalculator;
