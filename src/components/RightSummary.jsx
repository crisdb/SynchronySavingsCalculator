import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import '../assets/styles/RightSummary.css';

const RightSummary = ({ synchronyRate, interest, totalContributions, totalSavings }) => {
    return (
        <Box className="right-summary">

            <div className="right-summary-section">
                <Typography variant="h6">
                    Synchrony Bank CD <br />
                </Typography>
                <Typography className="right-summary-apr">{synchronyRate}% APY</Typography>
            </div>

            <div className="right-summary-section">
                <Typography variant="h6">Your Total Interest Earned</Typography>
                <Typography>${interest}</Typography>
            </div>

            <div className="right-summary-section">
                <Typography variant="h6">Your Total Savings over 60 months</Typography>
                <Typography>${totalContributions}</Typography>
            </div>
            <div className="right-summary-highlight">
                <Typography className="highlight-text">
                    <span className="highlight-earn">Earn</span>{' '}
                    <span className="highlight-8x">8X</span>
                </Typography>
                <Typography className="highlight-subtext">the national average.</Typography>
                <Button className="right-summary-button">
                    Open Account
                </Button>
            </div>
        </Box>
    );
};

export default RightSummary;
