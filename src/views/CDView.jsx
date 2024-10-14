// src/views/CDView.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import CDFavorable from '../components/CDFavorable';
import CDLessFavorable from '../components/CDLessFavorable';
import CDFavorableMobile from '../components/CDFavorableMobile';
import CDLessFavorableMobile from '../components/CDLessFavorableMobile';
import Chart from '../components/Chart';
import '../assets/styles/CDView.css';

const CDView = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mode, setMode] = useState('favorable');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const chartZoom = mode === 'favorable' ? 5 : 10;

    return (
        <Box className="cd-container" sx={{ padding: 3 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setMode((prev) => (prev === 'favorable' ? 'less-favorable' : 'favorable'))}
            >
                Toggle to {mode === 'favorable' ? 'Less-Favorable' : 'Favorable'}
            </Button>

            {isMobile ? (
                mode === 'favorable' ? <CDFavorableMobile /> : <CDLessFavorableMobile />
            ) : (
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid item xs={12} md={5}>
                        {mode === 'favorable' ? <CDFavorable /> : <CDLessFavorable />}
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Chart zoom={chartZoom} />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default CDView;


// USE THIS TO EMULATE THE CMS AND COMMENT OUT ABOVE
// import React from 'react';
// import CDCalculator from '../components/CDCalculator';
//
// // Simulate the CMS environment locally
// const CDView = () => (
//     <div id="product-cds-rate-component" data-mode="favorable">
//         <h1>CD Calculator - Development Preview</h1>
//         <CDCalculator />
//     </div>
// );
//
// export default CDView;
