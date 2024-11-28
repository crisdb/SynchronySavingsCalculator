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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);
    const [apiRate, setApiRate] = useState(4.65); // Default rate
    const [apiNationalRate, setApiNationalRate] = useState(0.56); // Default national rate
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

    const calculateSavings = (deposit, monthlyContribution, term) => {
        const monthlyRate = (apiRate / 100) / 12;
        const months = term * 12;
        const futureValue =
            deposit * Math.pow(1 + monthlyRate, months) +
            (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

        // Cap future value to $3 million
        return Math.min(futureValue, MAX_SAVINGS);
    };

    const totalSavings = calculateSavings(deposit, monthlyContribution, term);

    const totalContributions = deposit + (monthlyContribution * term * 12);

    // Calculate interest earned, cap it to not go beyond max savings
    const cappedInterest = Math.max(0, totalSavings - totalContributions);

    // total contributions do not display more than MAX_SAVINGS
    const displayContributions = Math.min(totalContributions, MAX_SAVINGS);

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
                    margin: '0 auto',
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
                        marginRight: '20px',
                    }}
                >
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>I want to...</Typography>

                    <Box mt={2}>
                        <Typography variant="h6">Start saving with:</Typography>
                        <Slider
                            value={deposit}
                            min={0}
                            max={300000}
                            step={500}
                            onChange={(e, newValue) => setDeposit(newValue)}
                            aria-labelledby="deposit-slider"
                        />
                        <IncrementDecrement
                            value={deposit}
                            step={500}
                            min={0}
                            max={300000}
                            onChange={(newValue) => setDeposit(newValue)}
                            showDollarSign={true}
                        />
                    </Box>

                    <Box mt={3}>
                        <Typography variant="h6">Contribute this much monthly:</Typography>
                        <Slider
                            value={monthlyContribution}
                            min={0}
                            max={5600}
                            step={100}
                            onChange={(e, newValue) => setMonthlyContribution(newValue)}
                            aria-labelledby="monthly-contribution-slider"
                        />
                        <IncrementDecrement
                            value={monthlyContribution}
                            step={100}
                            min={0}
                            max={5600}
                            onChange={(newValue) => setMonthlyContribution(newValue)}
                            showDollarSign={true} // Display dollar sign for monthly contribution
                        />
                    </Box>

                    <Box mt={3}>
                        <Typography variant="h6">Grow my savings for this long:</Typography>
                        <Slider
                            value={term}
                            min={1}
                            max={20}
                            step={1}
                            onChange={(e, newValue) => setTerm(newValue)}
                            aria-labelledby="term-slider"
                        />
                        <IncrementDecrement
                            value={term}
                            step={1}
                            min={1}
                            max={20}
                            onChange={(newValue) => setTerm(newValue)}
                            showDollarSign={false}
                        />
                    </Box>

                    <Box mt={3}>
                        <Typography className="legal-text">
                            Legal TBD: Calculator estimates are for illustrative purposes only. Account growth, interest earned, and comparisons are estimates and actual savings amounts may vary.
                            Source: Curinos LLC. curinos.com Although the information has been obtained from the various institutions themselves, the accuracy cannot be guaranteed. See disclosures below for more information.
                        </Typography>
                    </Box>
                </Box>

                {/* Middle Section (Chart) */}
                <Box className="chart-container" sx={{ flex: 2, paddingRight: '10px' }}>
                    <Typography sx={{ marginBottom: 2 }}>
                        Synchrony Bank ({apiRate}% APY*) vs National Average ({apiNationalRate}% APY*)
                    </Typography>
                    <Chart
                        term={term}
                        deposit={deposit}
                        monthlyContribution={monthlyContribution}
                        apiRate={apiRate}
                        apiNationalRate={apiNationalRate}
                        totalSavings={totalSavings}
                    />
                </Box>

                {/* Right Section */}
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
                        interest={Math.round(cappedInterest).toLocaleString('en-US')}
                        totalContributions={Math.round(displayContributions).toLocaleString('en-US')}
                        totalSavings={Math.round(totalSavings).toLocaleString('en-US')}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HYSComparison;
