import { Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import RangeDatePicker from "../../../../components/common/RangeDatePicker";
import statisticApi from "../../../../api/statisticApi";

const date = new Date();

const initialEndDay = date.toISOString().slice(0, 10);

const month = date.getMonth();
const initStartMonth = month.toString().length == 1 ? `0${month}` : month;
const initialStartDay = `${date.getFullYear()}-${initStartMonth}-${date.getDate()}`;

const StaticSearchChart = () => {
	const [labelsDayRange, setLabelsDayRange] = useState([]);
	const [countFreeSearch, setCountFreeSearch] = useState([]);
	const [countVipSearch, setCountVipSearch] = useState([]);
	const [startDay, setStartDay] = useState(initialStartDay);
	const [endDay, setEndDay] = useState(initialEndDay);

	const data = {
		labels: labelsDayRange,
		datasets: [
			{
				data: countFreeSearch,
				label: "Tra cứu miễn phí",
				borderColor: "#3e95cd",
				fill: false,
			},
			{
				data: countVipSearch,
				label: "Tra cứu có phí",
				borderColor: "#8e5ea2",
				fill: false,
			},
		],
	};
	const options = {
		legend: {
			display: true,
			position: "bottom",
		},
	};

	useEffect(() => {
		const fetchStatisticSearchFree = () => {
			statisticApi
				.postSearchFreeStatistic({
					start: startDay,
					end: endDay,
				})
				.then((response) => {
					setLabelsDayRange(response.data.dayRange);
					setCountFreeSearch(response.data.count);
					// this.setState({ resData: response.data });
				})
				.catch((error) => {
					console.log(error);
				});
		};

		const fetchStatisticSearchVip = () => {
			statisticApi
				.postSearchVipStatistic({
					start: startDay,
					end: endDay,
				})
				.then((response) => {
					setCountVipSearch(response.data.count);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchStatisticSearchFree();
		fetchStatisticSearchVip();
	}, []);

	return (
		<React.Fragment>
			<div className='header'>
				<Typography
					variant='h5'
					style={{ margin: "2rem 0 1rem", textAlign: "center" }}
				>
					Số lượt tra cứu theo từng ngày
				</Typography>
			</div>
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Thống kê số lượt tra cứu theo từng ngày</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<Row className='border-bottom py-2 bg-light'>
						<Col sm='6' className='d-flex mb-2 mb-sm-0'>
							<RangeDatePicker />
						</Col>
					</Row>
					<Line data={data} options={options} />
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default StaticSearchChart;
