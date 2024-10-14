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



// USE THIS TO EMULATET THE CMS AND COMMENT OUT ABOVE

// import React from 'react';
// import OffTermCDCalculator from '../components/OffTermCDCalculator';
//
// // Simulate the CMS environment locally
// const OffTermCDView = () => (
//     <div id="product-offterm-cd-component">
//       <h1>Off-Term CD Calculator - Development Preview</h1>
//       <OffTermCDCalculator />
//     </div>
// );
//
// export default OffTermCDView;
