import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import RightSummary from './RightSummary';
import Chart from './Chart';
import '../assets/styles/HYSComparison.css';


const HYSComparison = ({ mode = 'favorable' }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);

    // Track window resizing to handle mobile/desktop layout
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Chart zoom based on mode
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
                        padding: '8px 16px',
                        backgroundColor: '#F8F8F9',
                        borderRadius: '10px 0 0 10px',
                        flex: '0 0 25%',
                        maxWidth: '350px',
                        minWidth: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: '20px'
                    }}
                >
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>I want to...</Typography>

                    {/* Start Saving With */}
                    <Box mt={2}>
                        <Typography variant="h6">Start saving with:</Typography>
                        <IncrementDecrement
                            value={deposit}
                            step={500}
                            min={0}
                            max={100000}
                            onChange={(newValue) => setDeposit(newValue)}
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

                    {/* Contribute Monthly */}
                    <Box mt={3}>
                        <Typography variant="h6">Contribute this much monthly:</Typography>
                        <IncrementDecrement
                            value={monthlyContribution}
                            step={50}
                            min={0}
                            max={10000}
                            onChange={(newValue) => setMonthlyContribution(newValue)}
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

                    {/* Grow Savings for this Long */}
                    <Box mt={3}>
                        <Typography variant="h6">Grow my savings for this long:</Typography>
                        <IncrementDecrement
                            value={term}
                            step={1}
                            min={1}
                            max={30}
                            onChange={(newValue) => setTerm(newValue)}
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

                    {/* Legal Text */}
                    <Box mt={3} sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ color: 'gray', textAlign: 'left' }}>
                            Legal TBD: Calculator estimates are for illustrative purposes only. Account growth, interest earned, and comparisons are estimates and actual savings amounts may vary. Source: Curinos LLC. Although the information has been obtained from the various institutions, accuracy cannot be guaranteed.
                        </Typography>
                    </Box>
                </Box>

                {/* Middle + Right Section with Light Gray Background */}
                <Box
                    className="combined-container"
                    sx={{
                        flex: '1 1 65%',
                        backgroundColor: '#F8F8F9',
                        borderRadius: '0 10px 10px 0',
                        padding: 4,
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Middle Section (Chart) */}
                    <Box className="chart-container" sx={{ flex: 2, paddingRight: '10px' }}>
                        <Typography sx={{ marginBottom: 2 }}>
                            Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)
                        </Typography>
                        <Chart
                            term={term}
                            deposit={deposit}
                            monthlyContribution={monthlyContribution}
                            zoom={chartZoom}
                        />
                    </Box>

                    {/* Right Section (Summary) */}
                    <Box
                        className="right-summary-container"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'flex-start',
                            minWidth: '250px'
                        }}
                    >
                        <RightSummary
                            interest={interest}
                            totalContributions={deposit + monthlyContribution * (term * 12)}
                            totalSavings={totalSavings}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HYSComparison;
