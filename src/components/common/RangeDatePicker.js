import React, { useState } from "react";
import classNames from "classnames";
import { InputGroup, DatePicker } from "shards-react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import "./RangeDatePicker.css";
import { Button } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
		alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const RangeDatePicker = (props) => {
	const classes1 = useStyles();
const {setStartDay, setEndDay} = props;
const startDay = "";
const endDay= "";

	// const { className } = this.props;

	const classes = classNames("d-flex", "my-auto", "date-range");

	// const handleStartDateChange = (value) => {
	// 	setStartDate(Date(value));
	// };

	// const handleEndDateChange = (value) => {
	// 	setEndDate(Date(value));
	// };

	return (
		<form className={classes1.container} noValidate >
		<TextField
			id="startDate"
			label="Birthday"
			type="date"
			defaultValue="2017-05-24"
			className={classes.textField}
			onChange={(e)=>setStartDay(e.target.value) }
			InputLabelProps={{
				shrink: true,
			}}
		/>
		<TextField
			id="endDate"
			label="Birthday"
			type="date"
			defaultValue="2017-05-24"
			className={classes.textField}
			onChange={(e)=>setEndDay(e.target.value) }
			InputLabelProps={{
				shrink: true,
			}}
		/>
					<Button
				color='primary'
				variant='contained'
				size='small'
				style={{ marginLeft: "0.3rem" }}
			>
				Lọc
			</Button>
	</form>
	);
};

export default RangeDatePicker;
