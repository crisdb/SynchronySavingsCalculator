import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import RightSummary from './RightSummary';
import Chart from './Chart';
import '../assets/styles/App.css';
import '../assets/styles/HYSComparison.css';

import { fetchRateData } from '../services/rateAPI';

const HYSComparison = () => {
    const MAX_SAVINGS = 3000000; // Cap savings at $3 million
    const MAX_INITIAL_DEPOSIT = 300000; // Cap initial deposit at $300,000
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [deposit, setDeposit] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(250);
    const [term, setTerm] = useState(5);
    const [apiRate, setApiRate] = useState(4.65); // Default HYS rate
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
                console.log('API Response:', data);

                const hysRate = parseFloat(data?.productTypes?.products?.[0]?.maxRate.replace('%', '')) || 4.65;
                console.log('Setting HYS Rate:', hysRate);
                setApiRate(hysRate);
            } catch (err) {
                console.error('Error fetching rate data:', err);
                setApiRate(3.99);
                setError('Failed to load rate data. Using fallback defaults.');
            }
        };

        loadRateData();
    }, []);

    const calculateSavings = (deposit, monthlyContribution, term, rate) => {
        const monthlyRate = (rate / 100) / 12;
        const months = term * 12;

        const futureValue =
            deposit * Math.pow(1 + monthlyRate, months) +
            (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

        return Math.min(futureValue, MAX_SAVINGS);
    };

    const handleDepositChange = (newValue) => {
        setDeposit(Math.min(newValue, MAX_INITIAL_DEPOSIT));
    };

    const synchronySavings = calculateSavings(deposit, monthlyContribution, term, apiRate);
    const totalSavings = calculateSavings(deposit, monthlyContribution, term, apiRate);
    const totalContributions = deposit + monthlyContribution * term * 12;
    const interestEarned = Math.max(0, totalSavings - totalContributions);

    return (
        <Box sx={{ padding: 4, minHeight: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', lg: 'stretch' },
                    gap: '10px',
                    backgroundColor: { xs: '#F8F8F9', lg: '#FFF' },
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
                {/* Left Section */}
                <Box
                    className="left-section"
                    sx={{
                        backgroundColor: '#F8F8F9',
                        borderRadius: '10px 0 0 10px',
                        flex: {xs: '1 1 auto', lg: '0 0 25%'},
                        maxWidth: {lg: '350px'},
                        minWidth: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h5> Calculate your savings. </h5>

                    <Typography variant="h4" sx={{textAlign: 'center'}}>
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
                                '& .MuiSlider-track': {color: '#006899'},
                                '& .MuiSlider-rail': {color: '#CCCCCC'},
                            }}
                        />
                    </Box>
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
                                '& .MuiSlider-track': {color: '#006899'},
                                '& .MuiSlider-rail': {color: '#CCCCCC'},
                            }}
                        />
                    </Box>
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
                    <Box mt={3} width="100%">
                        <Typography className="legal-text">
                            Legal TBD: Calculator estimates are for illustrative purposes only.
                            Account growth, interest earned, and comparisons are estimates, and
                            actual savings amounts may vary. <br/>
                            Source: Curinos LLC. curinos.com Although the information has been
                            obtained from the various institutions themselves, the accuracy cannot
                            be guaranteed. See disclosures below for more information.
                        </Typography>
                    </Box>
                </Box>

                {/* Chart and Summary Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        flex: 1,
                        alignItems: 'stretch',
                        gap: '10px',
                    }}
                >
                    <Box
                        className="chart-container"
                        sx={{
                            flex: { xs: '1 1 auto', lg: 3 },
                            marginLeft: '8px',
                            display: { xs: 'none', lg: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderLeft: '2px solid white',
                        }}
                    >
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>
                            Your earnings with Synchrony Bank High Yield Savings
                        </Typography>

                        <Chart
                            term={term}
                            deposit={deposit}
                            monthlyContribution={monthlyContribution}
                            apiRate={apiRate}
                            maxSavings={MAX_SAVINGS}
                            hideNationalAverage={apiRate < 4}
                        />
                    </Box>

                    <Box
                        className="right-summary-container"
                        sx={{
                            flex: { xs: '1 1 auto', lg: 1 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '20px',
                            alignItems: 'flex-start',
                            minWidth: '250px',
                        }}
                    >
                        <RightSummary
                            type="HYS"
                            synchronyRate={apiRate}
                            interest={Math.round(interestEarned).toLocaleString()}
                            totalContributions={Math.round(totalContributions).toLocaleString()}
                            totalSavings={Math.round(totalSavings).toLocaleString()}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HYSComparison;
