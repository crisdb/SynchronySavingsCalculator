// src/components/HYSFavorable.jsx
import React from 'react';

const HYSFavorable = ({ deposit, interest, totalSavings, term }) => (
    <div>
        <h2>HYS Favorable Summary</h2>
        <p>Initial Deposit: ${deposit}</p>
        <p>Total Interest Earned: ${interest}</p>
        <p>Total Savings: ${totalSavings}</p>
        <p>Term: {term} months</p>
    </div>
);

export default HYSFavorable;
