// Example: Calculate simple interest
export const calculateInterest = (principal, rate, time) => {
    return principal * (rate / 100) * time;
};

// Example: Format data for charts
export const formatChartData = (data) => {
    // Assumes data is an array of rate objects
    return data.map((item, index) => ({
        month: index + 1,
        rate: item.maxRate,
    }));
};
