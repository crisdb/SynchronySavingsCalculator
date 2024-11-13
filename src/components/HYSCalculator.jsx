import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import RightSummary from "./RightSummary";
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    flexWrap: { xs: 'wrap', lg: 'nowrap' },
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '10px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {/* Left Section */}
                <Box
                    className="section left-section"
                    sx={{
                        flex: '0 0 500px',
                        maxWidth: '500px',
                        minWidth: '300px',
                        backgroundColor: '#F8F8F9',
                        padding: 4,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
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
                        <Typography variant="body2" sx={{ color: 'gray', textAlign: 'center' }}>
                            Legal TBD: Calculator estimates are for illustrative purposes only. Source: Curinos LLC.
                        </Typography>
                    </Box>
                </Box>

                {/* Right Section */}
                <Box
                    className="section right-section"
                    sx={{
                        flex: '1 1 auto',
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: '58px',
                        alignItems: 'flex-start',
                        minWidth: '300px'
                    }}
                >
                    <Box className="chart-container" sx={{ flex: 2 }}>
                        <Typography>Synchrony Bank (4.65% APY*) vs National Average (0.56% APY*)</Typography>
                        <Chart zoom={chartZoom} />
                    </Box>
                    <RightSummary
                        interest={interest}
                        totalContributions={deposit + monthlyContribution * (term * 12)}
                        totalSavings={totalSavings}
                    />
                </Box>
            </Box>
        </Box>
    );


};

export default HYSCalculator;
