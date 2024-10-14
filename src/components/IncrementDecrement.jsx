// src/components/IncrementDecrement.jsx
import React, { useState } from 'react';
import { Box, IconButton, Typography, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#00344D',
    borderRadius: '24px',
    padding: '5px 10px',
    color: '#fff',
    width: '180px',
    justifyContent: 'space-between',
});

const IncrementDecrement = ({ initialValue, step, min, max, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleIncrement = () => {
        const newValue = Math.min(value + step, max);
        setValue(newValue);
        onChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min);
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <StyledBox>
            <IconButton onClick={handleDecrement} sx={{ color: '#fff' }}>
                <RemoveIcon />
            </IconButton>

            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${value.toLocaleString()}
            </Typography>

            <IconButton onClick={handleIncrement} sx={{ color: '#fff' }}>
                <AddIcon />
            </IconButton>
        </StyledBox>
    );
};

export default IncrementDecrement;
