import { Container, Typography } from "@material-ui/core";
import React from "react";
import StaticSearchChart from "../../components/StaticSearchChart";
import StatisticDeposit from "../../components/StatisticDeposit";

const MainPage = () => {
	return (
		<React.Fragment>
			<Container>
				<Typography
					style={{ margin: "1rem 0 ", textAlign: "center" }}
					variant='h4'
					component='h1'>
					Trang chủ admin Minh Triết Nhân Sinh
				</Typography>

				{/* <ServiceOverview /> */}

				<StaticSearchChart />

				<StatisticDeposit />
			</Container>
		</React.Fragment>
	);
};

export default MainPage;
