import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import IncrementDecrement from './IncrementDecrement';
import RightSummary from './RightSummary';
import Chart from './Chart';
import '../assets/styles/HYSComparison.css';

import { fetchRateData } from '../services/rateAPI';

const CDComparison = () => {
    const MAX_SAVINGS = 3000000;
    const MAX_INITIAL_DEPOSIT = 300000;
    const [deposit, setDeposit] = useState(5000); // default starting deposit: $5,000
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [term, setTerm] = useState(5);
    const [apiRate, setApiRate] = useState(4.85); // default CD rate
    const [apiNationalRate, setApiNationalRate] = useState(2.34); // default national average

    useEffect(() => {
        // Fetch CD-specific rate data
        const loadRateData = async () => {
            try {
                const data = await fetchRateData();
                const cdProduct = data.productTypes.products.find(
                    (product) => product.displayCode === 'CD'
                );
                if (cdProduct) {
                    setApiRate(parseFloat(cdProduct.maxRate.replace('%', '')) || 4.85);
                    setApiNationalRate(parseFloat(cdProduct.maxAPY.replace('%', '')) || 2.34);
                }
            } catch (err) {
                console.error('Error fetching CD rate data', err);
            }
        };

        loadRateData();
    }, []);

    // Calculate future savings
    const calculateSavings = (deposit, monthlyContribution, term, rate) => {
        const monthlyRate = (rate / 100) / 12;
        const months = term * 12;
        return Math.min(
            deposit * Math.pow(1 + monthlyRate, months) +
            (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate,
            MAX_SAVINGS
        );
    };

    // Handle deposit changes with a cap
    const handleDepositChange = (newValue) => {
        setDeposit(Math.min(newValue, MAX_INITIAL_DEPOSIT));
    };

    // Calculate total contributions and interest earned
    const synchronySavings = calculateSavings(deposit, monthlyContribution, term, apiRate);
    const totalContributions = deposit + monthlyContribution * term * 12;
    const interestEarned = Math.max(0, synchronySavings - totalContributions);

    return (
        <Box sx={{ padding: 4, minHeight: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', lg: 'stretch' },
                    gap: '10px',
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
                        flex: { xs: '1 1 auto', lg: '0 0 25%' },
                        maxWidth: { lg: '350px' },
                        minWidth: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
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
                                '& .MuiSlider-track': { color: '#006899' },
                                '& .MuiSlider-rail': { color: '#CCCCCC' },
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
                </Box>

                {/* Right Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'stretch',
                        gap: '10px',
                    }}
                >
                    <Box
                        className="chart-container"
                        sx={{
                            flex: 3,
                            marginLeft: '8px',
                            display: { xs: 'none', lg: 'flex' }, // hide chart on mobile (xs)
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderLeft: '2px solid white',
                        }}
                    >
                        <Typography variant="h4" sx={{ marginBottom: 2 }}>
                            Your earnings with Synchrony Bank CD
                        </Typography>
                        <Chart
                            term={term}
                            deposit={deposit}
                            monthlyContribution={monthlyContribution}
                            apiRate={apiRate}
                            apiNationalRate={apiNationalRate}
                            maxSavings={MAX_SAVINGS}
                            yAxisRange={[5000, 7000]}
                            xAxisLabels={[12, 24, 36, 48, 60]}
                        />
                    </Box>
                    <Box
                        className="right-summary-container"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '20px',
                            alignItems: 'flex-start',
                            minWidth: '250px',
                        }}
                    ><RightSummary
                        type="CD"
                        synchronyRate={apiRate}
                        interest={Math.round(interestEarned).toLocaleString()}
                        totalContributions={Math.round(totalContributions).toLocaleString()}
                        totalSavings={Math.round(synchronySavings).toLocaleString()}
                    />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CDComparison;
