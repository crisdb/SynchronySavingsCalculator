export const calculateInterest = (principal, rate, time) => {
    return principal * (rate / 100) * time;
};


export const formatChartData = (data) => {
    return data.map((item, index) => ({
        month: index + 1,
        rate: item.maxRate,
    }));
};
