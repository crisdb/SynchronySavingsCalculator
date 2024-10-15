// src/components/IncrementDecrement.jsx
import React, { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../assets/styles/IncrementDecrement.css'; // Import the CSS file

const IncrementDecrement = ({ initialValue = 0, step = 1, min = 0, max = 100, onChange, size = 'large' }) => {
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
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) { // Only allow numeric input
            const numericValue = Math.max(min, Math.min(parseInt(inputValue || 0, 10), max));
            setValue(numericValue);
            onChange && onChange(numericValue);
        }
    };

    return (
        <Box className={`increment-decrement ${size}`}>
            <IconButton onClick={handleDecrement} className="button">
                <RemoveIcon />
            </IconButton>

            <TextField
                value={value}
                onChange={handleChange}
                variant="standard"
                inputProps={{
                    style: {
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        width: '80px',
                        color: 'white',
                    },
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                }}
            />

            <IconButton onClick={handleIncrement} className="button">
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default IncrementDecrement;
