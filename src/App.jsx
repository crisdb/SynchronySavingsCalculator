import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HYSComparisonView from './views/HYSComparisonView';
import CDComparison from "./components/CDComparison";
import './assets/styles/App.css';
import {ThemeProvider} from "@mui/material/styles";
import theme from "./assets/styles/theme.js";

const App = () => (
    <ThemeProvider theme={theme}>
  <Router>
    <Routes>
      <Route path="/hys" element={<HYSComparisonView />} />
      <Route path="/cd" element={<CDComparison/>} />
      <Route path="*" element={<Navigate to="/hys" />} />
    </Routes>
  </Router>
    </ThemeProvider>
);

export default App;
