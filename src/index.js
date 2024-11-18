import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Render the full React app for local development if the #root element is present
if (document.getElementById('root')) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

// Export individual components for CMS usage
export { default as HYSCalculator } from './components/HYSComparison';
export { default as CDCalculator } from './components/CDCalculator';
export { default as OffTermCDCalculator } from './components/OffTermCDCalculator';
