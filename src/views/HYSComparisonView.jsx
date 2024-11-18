import React, { useState, useEffect } from 'react';
import HYSComparison from '../components/HYSComparison'; // Updated import
import '../assets/styles/HYSComparisonView.css';

// Uncomment the following lines to emulate the CMS environment locally
// const HYSComparisonView = () => (
//     <div id="product-hys-rate-component" data-mode="unfavorable">
//         <h1>HYS Calculator - CMS Development Preview</h1>
//         <HYSComparison rate={4.5} deposit={1000} interest={200} totalSavings={1200} term={12} overrideFavorable={false} />
//     </div>
// );

// export default HYSComparisonView;

const HYSComparisonView = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mode, setMode] = useState('favorable'); // Default mode

    // Track window resizing to handle mobile/desktop layout
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Convert mode to boolean for HYSComparison
    const overrideFavorable = mode === 'favorable';

    // Render the HYSComparison with the appropriate props
    return (
        <div className="hys-container" style={{ padding: '24px' }}>
            <h1>See how much your money can grow.</h1>
            <button
                onClick={() => setMode((prev) => (prev === 'favorable' ? 'less-favorable' : 'favorable'))}
            >
                Toggle to {mode === 'favorable' ? 'Less-Favorable' : 'Favorable'}
            </button>

            <HYSComparison
                rate={4.5} // Example rate value for testing
                deposit={1000} // Example deposit value
                interest={200} // Example interest value
                totalSavings={1200} // Example total savings value
                term={12} // Example term in months
                overrideFavorable={overrideFavorable}
                isMobile={isMobile}
            />
        </div>
    );
};

export default HYSComparisonView;
