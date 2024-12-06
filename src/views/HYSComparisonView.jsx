import React, { useState, useEffect } from 'react';
import HYSComparison from '../components/HYSComparison';
import '../assets/styles/HYSComparisonView.css';

const HYSComparisonView = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mode, setMode] = useState(null); // Initial mode is null until determined
    const [rate, setRate] = useState(null);
    const [cmsMode, setCmsMode] = useState(null); // Mode determined by CMS attribute

    useEffect(() => {
        const cmsElement = document.getElementById('product-hys-rate-component');
        const cmsMode = cmsElement?.getAttribute('data-mode');

        if (cmsMode) {
            setMode(cmsMode); // CMS mode takes precedence
        } else {
            fetch('https://api-uat.syf.com/v1/retailBank/products?serviceLevel=0000001')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    const apiRate = data?.products?.[0]?.rate || 0;
                    setRate(apiRate);
                    setMode(apiRate >= 4 ? 'favorable' : 'unfavorable');
                })
                .catch((error) => {
                    console.error('Error fetching API:', error);
                    setMode('unfavorable'); // Default to unfavorable on error
                    console.log('Mode set to unfavorable due to API error');
                });
        }
    }, []);
    // Demo button for development only
    const toggleMode = () => {
        setMode((prev) => (prev === 'favorable' ? 'unfavorable' : 'favorable'));
    };

    return (
        <div className="hys-container" style={{padding: '10px'}}>
            {/*/!* Toggle button for demo purposes, only visible in development *!/*/}
            {/*{process.env.NODE_ENV === 'development' && (*/}
            {/*    <button onClick={toggleMode}>*/}
            {/*        {mode === 'favorable' ? 'Switch to Unfavorable (Demo)' : 'Switch to Favorable (Demo)'}*/}
            {/*    </button>*/}
            {/*)}*/}
            <h1>See how much your money can grow.</h1>

            {mode && (
                <HYSComparison
                    rate={rate}
                    deposit={1000}
                    interest={200}
                    totalSavings={1200}
                    term={12}
                    zoomLevel={mode === 'favorable' ? 'normal' : 'zoomed'}
                    hideNationalAverage={mode === 'unfavorable'}
                    isMobile={isMobile}
                />
            )}
        </div>
    );
};

export default HYSComparisonView;
