import { useState } from 'react';
import { Slider, TextField, Box, Typography } from '@mui/material';

const minDistance = 5;

const MinimumDistanceSlider = ({ min = 0, max = 100, onChange }) => {
	const [value, setValue] = useState([min, max]);

	const handleSliderChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) return;

		if (activeThumb === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
		}
		onChange && onChange(value);
	};

	const handleMinInputChange = (event) => {
		let newMin = Number(event.target.value);
		if (newMin <= value[1] - minDistance && newMin >= min) {
			setValue([value[1], newMin]);
			onChange && onChange([value[1], newMin]);
		}
	};

	const handleMaxInputChange = (event) => {
		let newMax = Number(event.target.value);
		if (newMax >= value[0] + minDistance && newMax <= max) {
			setValue([value[0], newMax]);
			onChange && onChange([value[0], newMax]);
		}
	};

	return (
		<Box sx={{ width: 100, padding: 2 }} className="flex flex-row">
			<Box
				sx={{
					display: 'inline-block',
					alignItems: 'center',
					gap: 2,
					mt: 2,
				}}
			>
				<Typography>Min: {value[0]}</Typography>
				<TextField
					label="Min"
					type="number"
					value={value[0]}
					onChange={handleMinInputChange}
					inputProps={{ min: value[0] + minDistance, max: max }}
					size="small"
				/>
			</Box>
			<Typography gutterBottom>Rango de Precios</Typography>
			<Slider
				value={value}
				onChange={handleSliderChange}
				valueLabelDisplay="auto"
				disableSwap
				min={min}
				max={max}
			/>
			<Box
				sx={{
					display: 'flex flex-row',
					alignItems: 'center',
					gap: 2,
					mt: 2,
				}}
			>
				<Typography>Max: {value[0]}</Typography>
				<TextField
					label="Max"
					type="number"
					value={value[1]}
					onChange={handleMaxInputChange}
					inputProps={{ min: value[0] + minDistance, max: max }}
					size="small"
				/>
			</Box>
		</Box>
	);
};

export default MinimumDistanceSlider;

/*
import { useState } from 'react';
import { Slider, TextField, Box } from '@mui/material';

const minDistance = 10;

const MinimumDistanceSlider = ({ min = 1, max = 5000, onChange }) => {
	const [value, setValue] = useState([min, max]);

	const handleSliderChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) return;

		if (activeThumb === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
		}
		onChange && onChange(value);
	};

	const handleMaxInputChange = (event) => {
		let newMax = Number(event.target.value);
		if (newMax >= value[0] + minDistance && newMax <= max) {
			setValue([value[0], newMax]);
			onChange && onChange([value[0], newMax]);
		}
	};

	const handleMinInputChange = (event) => {
		let newMax = Number(event.target.value);
		if (newMax >= value[0] + minDistance && newMax <= max) {
			setValue([value[0], newMax]);
			onChange && onChange([value[0], newMax]);
		}
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
			<TextField
				label="Min"
				type="number"
				value={`${value[0]}€`}
				onChange={handleMinInputChange}
				inputProps={{ max: value[1] - minDistance, min: min }}
				size="small"
			/>
			<Slider
				value={value}
				onChange={handleSliderChange}
				valueLabelDisplay="auto"
				disableSwap
				min={min}
				max={max}
			/>
			<TextField
				label="Max"
				type="number"
				value={`${value[1]}€`}
				onChange={handleMaxInputChange}
				inputProps={{ min: value[0] + minDistance, max: max }}
				size="small"
			/>
		</Box>
	);
};

export default MinimumDistanceSlider;
*/
