import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../assets/styles/IncrementDecrement.css';

const IncrementDecrement = ({
                                value,
                                step = 1,
                                min = 0,
                                max = 100,
                                onChange,
                                size = 'large',
                                showDollarSign = true,
                            }) => {
    const handleIncrement = () => {
        const newValue = Math.min(value + step, max);
        onChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min);
        onChange(newValue);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        const numericValue = parseInt(inputValue || 0, 10);
        if (numericValue <= max && numericValue >= min) {
            onChange(numericValue);
        }
    };

    return (
        <Box className={`increment-decrement ${size}`}>
            <IconButton onClick={handleDecrement} aria-label="decrement" size="small" className="icon-button">
                <RemoveIcon className="icon" />
            </IconButton>

            <div className="input-wrapper">
                {showDollarSign ? <span className="dollar-sign">$</span> : null}
                <input
                    type="text"
                    value={value.toLocaleString('en-US')} // Format the value with commas
                    onChange={handleChange}
                    className="input-field"
                    aria-label="Amount"
                />
            </div>

            <IconButton onClick={handleIncrement} aria-label="increment" size="small" className="icon-button">
                <AddIcon className="icon" />
            </IconButton>
        </Box>
    );
};

export default IncrementDecrement;
