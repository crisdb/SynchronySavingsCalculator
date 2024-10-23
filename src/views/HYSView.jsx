import React, { useState, useEffect } from 'react';
import HYSCalculator from '../components/HYSCalculator'; // Main calculator component
import '../assets/styles/HYSView.css';



//USE THIS TO EMULATE THE CMS AND COMMENT OUT ABOVE
//
// import React from 'react';
// import HYSCalculator from '../components/HYSCalculator';
//
// // Simulate the CMS environment locally
// const HYSView = () => (
//     <div id="product-hys-rate-component" data-mode="unfavorable">
//         <h1>HYS Calculator - CMS Development Preview</h1>
//         <HYSCalculator />
//     </div>
// );
//
// export default HYSView;



const HYSView = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mode, setMode] = useState('favorable'); // Default mode

    // Track window resizing to handle mobile/desktop layout
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render the HYSCalculator with the appropriate props
    return (
        <div className="hys-container" style={{ padding: '24px' }}>
            <h1>See how much your money can grow.</h1>
            <button
                onClick={() => setMode((prev) => (prev === 'favorable' ? 'less-favorable' : 'favorable'))}
            >
                Toggle to {mode === 'favorable' ? 'Less-Favorable' : 'Favorable'}
            </button>

            <HYSCalculator mode={mode} isMobile={isMobile} />
        </div>
    );
};

export default HYSView;
