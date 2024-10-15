// src/components/HYSCalculator.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import Chart from './Chart';
import '../assets/styles/HYSCalculator.css';

const HYSCalculator = ({ mode = 'favorable' }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);

    const chartZoom = mode === 'favorable' ? 10 : 5;

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
        <Box sx={{ padding: 4, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="flex-start"
                sx={{ maxWidth: '1400px', margin: '0 auto' }}
            >
                {/* Left Section: User Inputs */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    className="section"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: '#F8F8F9',
                        padding: 4,
                        minHeight: '100%',
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 440 }}>
                        <Typography variant="h4" sx={{ fontSize: '24px', textAlign: 'center' }}>
                            I want to...
                        </Typography>

                        <Box mt={2}>
                            <Typography variant="h6">Start saving with:</Typography>
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
                            />
                        </Box>

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
                            />
                        </Box>

                        <Box mt={3}>
                            <Typography
                                variant="body2"
                                sx={{ color: 'gray', textAlign: 'center' }}
                            >
                                Legal TBD: Calculator estimates are for illustrative purposes only.
                                <br />
                                Source: Curinos LLC. Although the information has been obtained from the
                                various institutions, the accuracy cannot be guaranteed.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Section: Chart and Summary */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    className="section"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <Typography variant="h4" sx={{ fontSize: '24px' }}>
                        Your earnings with Synchrony Bank High Yield Savings
                    </Typography>

                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                        <Grid item xs={12} md={7}>
                            <Typography>
                                Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)
                            </Typography>
                            <Box mt={3}>
                                <Chart zoom={chartZoom} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={5} className="summary">
                            <Box>
                                <Typography variant="h6">Summary</Typography>
                                <Typography>Total Interest Earned: ${interest}</Typography>
                                <Typography>
                                    Total Contributions: ${deposit + monthlyContribution * (term * 12)}
                                </Typography>
                                <Typography>Total Savings: ${totalSavings}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                className="summary-button"
                            >
                                Open Account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );

};

export default HYSCalculator;
