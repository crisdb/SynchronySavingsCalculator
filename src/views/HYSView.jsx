// src/views/HYSView.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Box, Button } from '@mui/material';
import HYSFavorable from '../components/HYSFavorable';
import HYSLessFavorable from '../components/HYSLessFavorable';
import HYSFavorableMobile from '../components/HYSFavorableMobile';
import HYSLessFavorableMobile from '../components/HYSLessFavorableMobile';
import Chart from '../components/Chart';
import '../assets/styles/HYSView.css';

const HYSView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mode, setMode] = useState('favorable');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartZoom = mode === 'favorable' ? 5 : 10;

  return (
      <Box className="hys-container" sx={{ padding: 3 }}>
        <Button
            variant="contained"
            color="primary"
            onClick={() => setMode((prev) => (prev === 'favorable' ? 'less-favorable' : 'favorable'))}
        >
          Toggle to {mode === 'favorable' ? 'Less-Favorable' : 'Favorable'}
        </Button>

        {isMobile ? (
            mode === 'favorable' ? <HYSFavorableMobile /> : <HYSLessFavorableMobile />
        ) : (
            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item xs={12} md={5}>
                {mode === 'favorable' ? <HYSFavorable /> : <HYSLessFavorable />}
              </Grid>
              <Grid item xs={12} md={7}>
                <Chart zoom={chartZoom} />
              </Grid>
            </Grid>
        )}
      </Box>
  );
};

export default HYSView;
