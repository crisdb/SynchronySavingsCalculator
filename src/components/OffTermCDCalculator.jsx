// CMS Integration Example:
//     <div id="product-offterm-cd-component"></div>

import React, { useState, useEffect } from 'react';
import OffTermCDDesktop from './OffTermCDDesktop';
import OffTermCDMobile from './OffTermCDMobile';

const OffTermCDCalculator = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Handle mobile/desktop layout switching based on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render appropriate layout based on screen size
    const renderContent = () => (isMobile ? <OffTermCDMobile /> : <OffTermCDDesktop />);

    return <div className="off-term-cd-calculator">{renderContent()}</div>;
};

export default OffTermCDCalculator;
