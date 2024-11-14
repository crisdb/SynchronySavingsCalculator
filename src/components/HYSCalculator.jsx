import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import RightSummary from './RightSummary';
import Chart from './Chart';
import '../assets/styles/HYSCalculator.css';

const HYSCalculator = ({ mode = 'favorable' }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);

    //Chart zoom based on mode
    const chartZoom = mode === 'favorable' ? 10 : 5;

    // Calculate the savings and interest
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

    // Calculate maximum y-axis value with a cap
    const maxSavingsCap = 2000000; // Cap at $2 million
    const yAxisMax = Math.min(Math.ceil(totalSavings / 100000) * 100000, maxSavingsCap);

    return (
        <Box sx={{ padding: 4, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {/* Left Section */}
                <Box
                    className="left-section"
                    sx={{
                        padding: 16,
                        backgroundColor: '#F8F8F9',
                        borderRadius: '10px 0 0 10px',
                        flex: '0 0 25%',
                        maxWidth: '350px'
                    }}
                >
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>I want to...</Typography>
                    <Box mt={2}>
                        <Typography variant="h6">Start saving with:</Typography>
                        <IncrementDecrement
                            value={deposit}
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
                            onChange={(e, newValue) => setDeposit(newValue)}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                    {/* Monthly Contribution */}
                    <Box mt={3}>
                        <Typography variant="h6">Contribute this much monthly:</Typography>
                        <IncrementDecrement
                            value={monthlyContribution}
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
                            onChange={(e, newValue) => setMonthlyContribution(newValue)}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                    {/* Term */}
                    <Box mt={3}>
                        <Typography variant="h6">Grow my savings for this long:</Typography>
                        <IncrementDecrement
                            value={term}
                            step={1}
                            min={1}
                            max={30}
                            onChange={setTerm}
                            showDollarSign={false}
                        />
                        <Slider
                            value={term}
                            min={1}
                            max={30}
                            step={1}
                            onChange={(e, newValue) => setTerm(newValue)}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </Box>

                {/* Middle Section with Chart */}
                <Box className="chart-container" sx={{ flex: '1 1 65%', backgroundColor: '#F8F8F9' }}>
                    <Typography sx={{ textAlign: 'center' }}>Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)</Typography>
                    <Chart
                        term={term}
                        deposit={deposit}
                        monthlyContribution={monthlyContribution}
                        yAxisMax={yAxisMax}
                        zoom={chartZoom}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HYSCalculator;
