import React, { useState } from "react";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import "./RangeDatePicker.css";
import { Button } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

const date = new Date();

const initialEndDay = moment(date).format("YYYY-MM-DD");

const initialStartDay = moment().subtract(1, "months").format("YYYY-MM-DD");

const RangeDatePicker = (props) => {
	const classes1 = useStyles();
	const classes = classNames("d-flex", "my-auto", "date-range");

	const [startDay, setStartDay] = useState(initialStartDay);
	const [endDay, setEndDay] = useState(initialEndDay);

	// const { initialSatdataFilter } = props;

	// const handleStartDateChange = (value) => {
	// 	setStartDate(Date(value));
	// };

	// const handleEndDateChange = (value) => {
	// 	setEndDate(Date(value));
	// };

	const handleFilter = () => {
		const dataFilter = { start: startDay, end: endDay };
		console.log(dataFilter);
	};

	return (
		<form className={classes1.container} noValidate>
			<TextField
				id='startDate'
				label='Ngày bắt đầu'
				type='date'
				defaultValue={startDay}
				className={classes.textField}
				onChange={(e) => setStartDay(e.target.value)}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='endDate'
				label='Ngày kết thúc'
				type='date'
				defaultValue={endDay}
				className={classes.textField}
				onChange={(e) => setEndDay(e.target.value)}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Button
				color='primary'
				variant='contained'
				size='small'
				style={{ marginLeft: "0.3rem" }}
				onClick={handleFilter}
			>
				Lọc
			</Button>
		</form>
	);
};

export default RangeDatePicker;
