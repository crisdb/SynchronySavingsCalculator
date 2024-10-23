import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import '../assets/styles/RightSummary.css'; // Import the CSS

const RightSummary = ({ interest, totalContributions, totalSavings }) => {
    return (
        <Box className="right-summary">
            <Typography className="right-summary-title">
                Your earnings with Synchrony Bank High Yield Savings
            </Typography>

            <Typography className="right-summary-text">
                Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)
            </Typography>

            <Grid container spacing={2} className="right-summary-section">
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Your Total Interest Earned</Typography>
                    <Typography>${interest}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Your Total Contributions</Typography>
                    <Typography>${totalContributions}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Your Total Savings Over 5 Years</Typography>
                    <Typography>${totalSavings}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography className="right-summary-text">
                        Earn the national average — 8x more.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className="right-summary-button"
                    >
                        Open Account
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RightSummary;
