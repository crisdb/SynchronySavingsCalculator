// src/views/OffTermCDView.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import OffTermCDDesktop from '../components/OffTermCDDesktop';
import OffTermCDMobile from '../components/OffTermCDMobile';
import '../assets/styles/OffTermCDView.css';

const OffTermCDView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <Box className="off-term-container" sx={{ padding: 3 }}>
        {isMobile ? <OffTermCDMobile /> : <OffTermCDDesktop />}
      </Box>
  );
};

export default OffTermCDView;
