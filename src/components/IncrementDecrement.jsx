// src/components/IncrementDecrement.jsx
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../assets/styles/IncrementDecrement.css'; // Ensure correct path

const IncrementDecrement = ({
                                initialValue = 0,
                                step = 1,
                                min = 0,
                                max = 1000,
                                onChange,
                                size = 'large',
                            }) => {
    const [value, setValue] = useState(initialValue);

    const handleIncrement = () => {
        const newValue = Math.min(value + step, max);
        setValue(newValue);
        onChange && onChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min);
        setValue(newValue);
        onChange && onChange(newValue);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (/^\d*$/.test(inputValue)) {
            const numericValue = parseInt(inputValue || 0, 10);
            if (numericValue < min || numericValue > max) {
                const clampedValue = Math.max(min, Math.min(numericValue, max));
                setValue(clampedValue);
                onChange && onChange(clampedValue);
            } else {
                setValue(numericValue);
                onChange && onChange(numericValue);
            }
        }
    };

    return (
        <Box className={`increment-decrement ${size}`}>
            <IconButton
                onClick={handleDecrement}
                className="button"
                aria-label="decrement"
                size="small"
                tabIndex="0"
            >
                <RemoveIcon />
            </IconButton>

            <div className="input-wrapper">
                <span className="dollar-sign">$</span>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="input-field"
                    aria-label="Amount"
                />
            </div>

            <IconButton
                onClick={handleIncrement}
                className="button"
                aria-label="increment"
                size="small"
                tabIndex="0"
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default IncrementDecrement;
