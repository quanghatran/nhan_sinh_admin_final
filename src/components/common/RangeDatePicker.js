import React, { useState } from "react";
import classNames from "classnames";
import { InputGroup, DatePicker } from "shards-react";

import "./RangeDatePicker.css";
import { Button } from "@material-ui/core";

const RangeDatePicker = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	// const { className } = this.props;

	const classes = classNames("d-flex", "my-auto", "date-range");

	const handleStartDateChange = (value) => {
		setStartDate(Date(value));
	};

	const handleEndDateChange = (value) => {
		setEndDate(Date(value));
	};

	return (
		<InputGroup className={classes}>
			<DatePicker
				size='sm'
				selected={startDate}
				onChange={handleStartDateChange}
				placeholderText='Start Date'
				dropdownMode='select'
				className='text-center'
			/>
			<DatePicker
				size='sm'
				selected={endDate}
				onChange={handleEndDateChange}
				placeholderText='End Date'
				dropdownMode='select'
				className='text-center'
			/>
			<Button
				color='primary'
				variant='contained'
				size='small'
				style={{ marginLeft: "0.3rem" }}
			>
				Lọc
			</Button>
		</InputGroup>
	);
};

export default RangeDatePicker;
