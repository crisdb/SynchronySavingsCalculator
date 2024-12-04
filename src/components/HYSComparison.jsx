import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import RightSummary from './RightSummary';
import Chart from './Chart';
import '../assets/styles/App.css';
import '../assets/styles/HYSComparison.css';

import { fetchRateData } from '../services/rateAPI';

const HYSComparison = ({ mode = 'favorable' }) => {
    const MAX_SAVINGS = 3000000; // Cap savings at $3 million
    const MAX_INITIAL_DEPOSIT = 300000; // Cap initial deposit at $300,000
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);
    const [apiRate, setApiRate] = useState(4.65);
    const [apiNationalRate, setApiNationalRate] = useState(0.56);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadRateData = async () => {
            try {
                const data = await fetchRateData();
                const product = data.productTypes.products.find(
                    (product) => product.displayCode === 'MMA'
                );
                if (product) {
                    setApiRate(parseFloat(product.maxRate.replace('%', '')) || 4.65);
                    setApiNationalRate(parseFloat(product.maxAPY.replace('%', '')) || 0.56);
                }
            } catch (err) {
                console.error('Error fetching rate data:', err);
                setError('Failed to load rate data. Using defaults.');
            }
        };

        loadRateData();
    }, []);

    const calculateSavings = (deposit, monthlyContribution, term, rate) => {
        const monthlyRate = (rate / 100) / 12;
        const months = term * 12;

        // Calculate future value with monthly compounding
        const futureValue =
            deposit * Math.pow(1 + monthlyRate, months) +
            (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

        // Apply the maximum savings cap
        return Math.min(futureValue, MAX_SAVINGS);
    };

    // Handle capped deposit value
    const handleDepositChange = (newValue) => {
        setDeposit(Math.min(newValue, MAX_INITIAL_DEPOSIT));
    };

    // Calculate savings for Synchrony Bank and the general savings
    const synchronySavings = calculateSavings(deposit, monthlyContribution, term, apiRate);
    const totalSavings = calculateSavings(deposit, monthlyContribution, term, apiRate);
    const totalContributions = deposit + (monthlyContribution * term * 12);
    const interestEarned = Math.max(0, totalSavings - totalContributions);
    const synchronyInterest = Math.max(0, synchronySavings - totalContributions);

    return (
        <Box sx={{ padding: 4, backgroundColor: '#F8F8F9', minHeight: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
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
                        marginRight: '20px',
                    }}
                >
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        I want to...
                    </Typography>

                    <Box mt={2} width="100%">
                        <Typography variant="h6">Start saving with:</Typography>
                        <IncrementDecrement
                            value={deposit}
                            step={500}
                            min={0}
                            max={MAX_INITIAL_DEPOSIT}
                            onChange={(newValue) => handleDepositChange(newValue)}
                            inputType="start-saving"
                            showDollarSign={true}
                        />
                        <Slider
                            value={deposit}
                            min={0}
                            max={MAX_INITIAL_DEPOSIT}
                            step={500}
                            onChange={(e, newValue) => handleDepositChange(newValue)}
                            aria-labelledby="deposit-slider"
                            sx={{
                                '& .MuiSlider-track': {
                                    color: '#006899',
                                },
                                '& .MuiSlider-rail': {
                                    color: '#CCCCCC',
                                },
                            }}
                        />
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ height: '16px' }} />

                    <Box mt={3} width="100%">
                        <Typography variant="h6">Contribute this much monthly:</Typography>
                        <IncrementDecrement
                            value={monthlyContribution}
                            step={50}
                            min={0}
                            max={10000}
                            onChange={(newValue) => setMonthlyContribution(newValue)}
                            inputType="monthly-contribution"
                            showDollarSign={true}
                        />
                        <Slider
                            value={monthlyContribution}
                            min={0}
                            max={10000}
                            step={50}
                            onChange={(e, newValue) => setMonthlyContribution(newValue)}
                            aria-labelledby="monthly-contribution-slider"
                            sx={{
                                '& .MuiSlider-track': {
                                    color: '#006899', // Blue for the left side
                                },
                                '& .MuiSlider-rail': {
                                    color: '#CCCCCC', // Gray for the right side
                                },
                            }}
                        />
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ height: '16px' }} />

                    <Box mt={3} width="100%">
                        <Typography variant="h6">Grow my savings for this long:</Typography>
                        <IncrementDecrement
                            value={term}
                            step={1}
                            min={1}
                            max={10}
                            onChange={(newValue) => setTerm(newValue)}
                            inputType="term"
                            showDollarSign={false}
                        />
                        <Slider
                            value={term}
                            min={1}
                            max={10}
                            step={1}
                            onChange={(e, newValue) => setTerm(newValue)}
                            aria-labelledby="term-slider"
                        />
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ height: '16px' }} />

                    <Box mt={3} width="100%">
                        <Typography className="legal-text">
                            Legal TBD: Calculator estimates are for illustrative purposes only.
                            Account growth, interest earned, and comparisons are estimates, and
                            actual savings amounts may vary. <br />
                            Source: Curinos LLC. curinos.com Although the information has been
                            obtained from the various institutions themselves, the accuracy
                            cannot be guaranteed. See disclosures below for more information.
                        </Typography>
                    </Box>
                </Box>

                <Box className="chart-container" sx={{ flex: 3, paddingRight: '20px' }}>
                    <Typography sx={{ marginBottom: 2 }}>
                        {/* Synchrony Bank ({apiRate}% APY*) vs National Average ({apiNationalRate}% APY*) */}
                        Your earnings with Synchrony Bank High Yield Savings
                    </Typography>
                    <Chart
                        term={term}
                        deposit={deposit}
                        monthlyContribution={monthlyContribution}
                        apiRate={apiRate}
                        apiNationalRate={apiNationalRate}
                        maxSavings={MAX_SAVINGS}
                    />
                </Box>

                <Box
                    className="right-summary-container"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        alignItems: 'flex-start',
                        minWidth: '250px',
                    }}
                >
                    <RightSummary
                        synchronyRate={apiRate}
                        interest={Math.round(interestEarned).toLocaleString()}
                        totalContributions={Math.round(totalContributions).toLocaleString()}
                        totalSavings={Math.round(totalSavings).toLocaleString()}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HYSComparison;
