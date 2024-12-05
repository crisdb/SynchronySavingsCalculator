import React, { useState, useEffect } from 'react';
import CDComparison from '../components/CDComparison';
import '../assets/styles/CDComparisonView.css';

// Uncomment the following lines to emulate the CMS environment locally
// const CDComparisonView = () => (
//     <div id="product-cd-rate-component" data-mode="unfavorable">
//         <h1>CD Calculator - CMS Development Preview</h1>
//         <CDComparison rate={4.5} deposit={1000} interest={200} totalSavings={1200} term={12} overrideFavorable={false} />
//     </div>
// );

// export default CDComparisonView;

const CDComparisonView = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mode, setMode] = useState('favorable'); // Default mode

    // window resizing for mobile/desktop layout
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // C boolean for CDComparison
    const overrideFavorable = mode === 'favorable';

    return (
        <div className="cd-container" style={{ padding: '24px' }}>
            <button
                onClick={() => setMode((prev) => (prev === 'favorable' ? 'less-favorable' : 'favorable'))}
            >
                Toggle to {mode === 'favorable' ? 'Less-Favorable' : 'Favorable'}
            </button>
            <h1>See how much your money can grow.</h1>

            <CDComparison
                rate={4.7}
                deposit={1000}
                interest={200}
                totalSavings={1200}
                term={12}
                overrideFavorable={overrideFavorable}
                isMobile={isMobile}
            />
        </div>
    );
};

export default CDComparisonView;
