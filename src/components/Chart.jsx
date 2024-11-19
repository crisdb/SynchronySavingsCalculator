import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/styles/Chart.css';

const Chart = ({ term, deposit, monthlyContribution }) => {
  const generateChartData = () => {
    const data = [];
    const monthlyRate = (4.65 / 100) / 12; // 4.65% APY
    let totalAmount = deposit;
    let maxSavings = deposit;

    // Add initial point at year 0
    data.push({
      key: `year-0`,
      year: 0,
      totalSavings: parseFloat(deposit.toFixed(2)),
      interestEarned: 0,
    });

    // Generate data points for each year
    for (let year = 1; year <= term; year++) {
      const months = year * 12;
      totalAmount =
          deposit * Math.pow(1 + monthlyRate, months) +
          (monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

      const totalContributions = deposit + monthlyContribution * months;
      const interestEarned = totalAmount - totalContributions;

      data.push({
        key: `year-${year}`,
        year,
        totalSavings: parseFloat(totalAmount.toFixed(2)),
        interestEarned: parseFloat(interestEarned.toFixed(2)),
      });

      maxSavings = Math.max(maxSavings, totalAmount);
    }

    return { data, maxSavings };
  };

  const { data, maxSavings } = generateChartData();
  const yAxisMax = Math.ceil(maxSavings * 1.1);

  const formatDollar = (value) => `$${parseFloat(value).toLocaleString()}`;

  // Custom tooltip content
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { year, totalSavings, interestEarned } = payload[0].payload;
      return (
          <div className="custom-tooltip">
            <strong>{`Year ${year}`}</strong>
            <div>Total Balance: {formatDollar(totalSavings)}</div>
            <div>Interest Earned: {formatDollar(interestEarned)}</div>
          </div>
      );
    }
    return null;
  };

  // Custom dots for the chart
  const renderCustomDot = ({ cx, cy, payload, index }) => (
      <circle
          key={`dot-${index}`} // Add unique key
          cx={cx}
          cy={cy}
          r={5}
          fill="#0071b9"
          stroke="#FFFFFF"
          strokeWidth={2}
          title={`Year: ${payload.year}, Total Savings: ${formatDollar(payload.totalSavings)}`}
      />
  );

  return (
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={445}>
          <LineChart data={data} margin={{ top: 20, right: 60, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* X-Axis for Years */}
            <XAxis
                dataKey="year"
                type="number"
                domain={[0, term]}
                tickCount={term + 1}
                interval={0}
                label={{ value: 'Years', position: 'insideBottom', offset: -10 }}
            />

            {/* Y-Axis for Total Savings */}
            <YAxis
                domain={[0, yAxisMax]}
                tickFormatter={formatDollar}
                label={{ value: 'Total Savings', angle: -90, position: 'insideLeft', offset: -10 }}
            />

            {/* Line for Total Savings */}
            <Line
                key="line-totalSavings" // Add unique key for the line
                type="basis"
                dataKey="totalSavings"
                stroke="#0071b9"
                strokeWidth={3}
                dot={renderCustomDot} // Render custom dots
            />

            {/* Tooltip */}
            <Tooltip content={customTooltip} />
          </LineChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot synchrony-dot" /> Synchrony Bank (4.65% APY*)
          </div>
          <div className="legend-item">
            <span className="legend-dot national-dot" /> National Average (0.56% APY*)
          </div>
        </div>
      </div>
  );
};

export default Chart;
