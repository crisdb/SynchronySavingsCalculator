import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import Chart from './Chart';
import '../assets/styles/HYSCalculator.css';

const HYSCalculator = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <Box sx={{ padding: 4, backgroundColor: "#FFFFFF", height: '100vh' }}>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="flex-start"
                sx={{ height: '100%', maxWidth: '1400px', margin: '0 auto' }} // Center the layout
            >
                {/* Left Section: User Inputs */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        maxWidth: 500,
                        height: 623,
                        backgroundColor: "#F8F8F9",
                        borderRadius: 2,
                        padding: 4,
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ fontSize: "24pt" }}>
                        I want to...
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Start saving with:
                    </Typography>
                    <IncrementDecrement
                        initialValue={deposit}
                        step={500}
                        min={0}
                        max={100000}
                        onChange={setDeposit}
                    />
                    <Slider
                        value={deposit}
                        min={0}
                        max={100000}
                        step={500}
                        onChange={(e, value) => setDeposit(value)}
                        valueLabelDisplay="auto"
                        sx={{ mt: 2 }}
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
                        <Slider
                            value={monthlyContribution}
                            min={0}
                            max={10000}
                            step={50}
                            onChange={(e, value) => setMonthlyContribution(value)}
                            valueLabelDisplay="auto"
                            sx={{ mt: 2 }}
                        />
                    </Box>

                    <Box mt={3}>
                        <Typography variant="h6">Grow my savings for this long:</Typography>
                        <IncrementDecrement
                            initialValue={term}
                            step={1}
                            min={1}
                            max={10}
                            onChange={setTerm}
                        />
                        <Slider
                            value={term}
                            min={1}
                            max={10}
                            step={1}
                            onChange={(e, value) => setTerm(value)}
                            valueLabelDisplay="auto"
                            sx={{ mt: 2 }}
                        />
                    </Box>
                </Grid>

                {/* Right Section: Chart and Summary */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        maxWidth: 855,
                        height: 623,
                        backgroundColor: "#F8F8F9",
                        borderRadius: 2,
                        padding: 4,
                    }}
                >
                    <Grid container spacing={2}>
                        {/* Chart Column */}
                        <Grid item xs={12} md={7}>
                            <Typography variant="h4" gutterBottom sx={{ fontSize: "24pt" }}>
                                Your earnings with Synchrony Bank High Yield Savings
                            </Typography>
                            <Typography>
                                Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)
                            </Typography>
                            <Box mt={3}>
                                <Chart zoom={5} />
                            </Box>
                        </Grid>

                        {/* Summary Column */}
                        <Grid item xs={12} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box>
                                    <Typography variant="h6">Summary</Typography>
                                    <Typography>Total Interest Earned: ${interest}</Typography>
                                    <Typography>
                                        Total Contributions: ${deposit + monthlyContribution * (term * 12)}
                                    </Typography>
                                    <Typography>Total Savings: ${totalSavings}</Typography>
                                </Box>

                                <Button variant="contained" color="primary" sx={{ mt: 'auto' }}>
                                    Open Account
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HYSCalculator;
