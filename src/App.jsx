import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HYSComparisonView from './views/HYSComparisonView';
import CDView from './views/CDView';
import OffTermCDView from './views/OffTermCDView';
import './assets/styles/App.css';
import {ThemeProvider} from "@mui/material/styles";
import theme from "./assets/styles/theme.js";

const App = () => (
    <ThemeProvider theme={theme}>
  <Router>
    <Routes>
      <Route path="/hys" element={<HYSComparisonView />} />
      <Route path="/cd" element={<CDView />} />
      <Route path="/offterm" element={<OffTermCDView />} />
      <Route path="*" element={<Navigate to="/hys" />} />
    </Routes>
  </Router>
    </ThemeProvider>
);

export default App;
