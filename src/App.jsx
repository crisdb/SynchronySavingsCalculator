import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HYSView from './views/HYSView';
import CDView from './views/CDView';
import OffTermCDView from './views/OffTermCDView';
import './assets/styles/App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/hys" element={<HYSView />} />
      <Route path="/cd" element={<CDView />} />
      <Route path="/offterm" element={<OffTermCDView />} />
      <Route path="*" element={<Navigate to="/hys" />} />
    </Routes>
  </Router>
);

export default App;
