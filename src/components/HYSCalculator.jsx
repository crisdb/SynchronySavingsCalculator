// src/components/HYSCalculator.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import Chart from './Chart';
import '../assets/styles/HYSCalculator.css';

const RATE_THRESHOLD = 4.0;

const HYSCalculator = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [deposit, setDeposit] = useState(10000); // Default deposit
  const [monthlyContribution, setMonthlyContribution] = useState(250); // Default monthly contribution
  const [term, setTerm] = useState(5); // Default term in years

  // Handle window resizing for mobile/desktop switching
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate savings based on input values
  const calculateSavings = () => {
    const monthlyRate = (4.65 / 100) / 12;
    const months = term * 12;
    const futureValue =
        deposit * Math.pow(1 + monthlyRate, months) +
        (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

    const interestEarned = futureValue - (deposit + monthlyContribution * months);
    return { totalSavings: futureValue.toFixed(2), interest: interestEarned.toFixed(2) };
  };

  const { totalSavings, interest } = calculateSavings();

  return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          See how much your money can grow.
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Calculate your savings.
        </Typography>

        <Grid container spacing={4}>
          {/* Left Section: User Inputs */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Start saving with:</Typography>
            <IncrementDecrement
                initialValue={deposit}
                step={500}
                min={0}
                max={100000}
                onChange={setDeposit}
            />

            <Box mt={3}>
              <Typography variant="h6">Contribute this much monthly:</Typography>
              <IncrementDecrement
                  initialValue={monthlyContribution}
                  step={50}
                  min={0}
                  max={10000}
                  onChange={setMonthlyContribution}
              />
            </Box>

            <Box mt={3}>
              <Typography variant="h6">Grow my savings for this long:</Typography>
              <Slider
                  value={term}
                  min={1}
                  max={10}
                  step={1}
                  onChange={(e, value) => setTerm(value)}
                  valueLabelDisplay="auto"
              />
            </Box>
          </Grid>

          {/* Right Section: Chart and Summary */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Your earnings with Synchrony Bank High Yield Savings
            </Typography>

            <Typography>
              Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)
            </Typography>

            <Box mt={3}>
              <Chart zoom={5} /> {/* Render the savings growth chart */}
            </Box>

            <Box mt={3}>
              <Typography variant="h6">Summary</Typography>
              <Typography>Total Interest Earned: ${interest}</Typography>
              <Typography>Total Contributions: ${deposit + monthlyContribution * (term * 12)}</Typography>
              <Typography>Total Savings: ${totalSavings}</Typography>
            </Box>

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Open Account
            </Button>
          </Grid>
        </Grid>
      </Box>
  );
};

export default HYSCalculator;
