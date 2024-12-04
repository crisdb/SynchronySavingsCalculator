import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/styles/Chart.css';

const Chart = ({ term, deposit, monthlyContribution }) => {
  const maxSavingsCap = 3000000; // Hard cap at $3 million

  const generateChartData = () => {
    const data = [];
    const synchronyMonthlyRate = (4.65 / 100) / 12; // 4.65% APY
    const nationalMonthlyRate = (0.56 / 100) / 12; // 0.56% APY
    let synchronyTotal = deposit;
    let nationalTotal = deposit;
    let maxSavings = deposit;

    // Add initial point at year 0
    data.push({
      year: 0,
      synchronySavings: deposit,
      nationalSavings: deposit,
      interestEarned: 0,
    });

    // Generate data points for each year
    for (let year = 1; year <= term; year++) {
      const months = year * 12;

      // Calculate total savings for Synchrony Bank
      synchronyTotal =
          deposit * Math.pow(1 + synchronyMonthlyRate, months) +
          (monthlyContribution * (Math.pow(1 + synchronyMonthlyRate, months) - 1)) / synchronyMonthlyRate;

      // Calculate total savings for National Average
      nationalTotal =
          deposit * Math.pow(1 + nationalMonthlyRate, months) +
          (monthlyContribution * (Math.pow(1 + nationalMonthlyRate, months) - 1)) / nationalMonthlyRate;

      const totalContributions = deposit + monthlyContribution * months;
      const interestEarned = synchronyTotal - totalContributions;

      data.push({
        year,
        synchronySavings: synchronyTotal,
        nationalSavings: nationalTotal,
        interestEarned: interestEarned,
      });

      maxSavings = Math.max(maxSavings, synchronyTotal, nationalTotal);
    }

    return { data, maxSavings };
  };

  const { data, maxSavings } = generateChartData();

  // Dynamically adjust Y-axis max
  const dynamicYAxisMax = Math.min(Math.ceil(maxSavings * 1.1 / 100000) * 100000, maxSavingsCap);

  // Generate ticks based on dynamic Y-axis max
  const tickInterval = dynamicYAxisMax / 5;
  const ticks = Array.from({ length: 6 }, (_, i) => Math.round(i * tickInterval));

  const formatDollar = (value) => `$${parseFloat(value).toLocaleString()}`;

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const currentYear = new Date().getFullYear();
      const { year, synchronySavings, interestEarned } = payload[0].payload;

      return (
          <div style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            color: '#333',
          }}>
            {/* Title */}
            <div style={{
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#0071b9',
              marginBottom: '8px',
            }}>
              {currentYear + year}
            </div>

            {/* Details */}
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>
              Total Balance: <strong>${synchronySavings.toLocaleString()}</strong>
            </div>
            <div style={{ fontSize: '14px' }}>
              Interest Earned: <strong>${interestEarned.toLocaleString()}</strong>
            </div>

            {/* Arrow */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '10px solid #ffffff',
            }} />
          </div>
      );
    }
    return null;
  };

  const renderCustomDot = ({ cx, cy, index }) => (
      <circle
          key={`dot-${index}`}
          cx={cx}
          cy={cy}
          r={5}
          fill="#0071b9"
          stroke="#FFFFFF"
          strokeWidth={2}
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
                domain={[0, dynamicYAxisMax]}
                ticks={ticks}
                tickFormatter={formatDollar}
                label={{ value: '', angle: -90, position: 'insideLeft', offset: -10 }}
            />

            {/* Line for Synchrony Savings */}
            <Line
                key="line-synchronySavings"
                type="basis"
                dataKey="synchronySavings"
                stroke="#0071b9"
                strokeWidth={3}
                dot={renderCustomDot}
            />

            {/* Line for National Average Savings */}
            <Line
                key="line-nationalSavings"
                type="basis"
                dataKey="nationalSavings"
                stroke="#CCCCCC"
                strokeWidth={2}
                // strokeDasharray="5 5"
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
