import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import listSearchFreeApi from "../../../../api/listSearchFreeApi";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const ListSearchFree = () => {
	const classes = useStyles();
	const [dataUsers, setNotes] = useState([]);

	useEffect(() => {
		const fetchGetListSearchFree = async () => {
			try {
				const response = await listSearchFreeApi.getListSearchFree();
				setNotes(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchGetListSearchFree();
	}, []);

	return (
		<React.Fragment>
			<Typography variant='h5' style={{ marginBottom: "1rem" }}>
				Danh sách tra cứu miễn phí
			</Typography>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Tên</TableCell>
							<TableCell>Số điện thoại</TableCell>
							<TableCell>ID người dùng (Nếu có)</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Ngày sinh</TableCell>
							<TableCell>Địa chỉ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataUsers.map((data) => (
							<TableRow key={data._id}>
								<TableCell component='th' scope='row'>
									{data.name}
								</TableCell>
								<TableCell>{data.phoneNumber}</TableCell>
								<TableCell>{data.user}</TableCell>
								<TableCell>{data.email}</TableCell>
								<TableCell>{data.birthDay}</TableCell>
								<TableCell>{data.address}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};

export default ListSearchFree;
