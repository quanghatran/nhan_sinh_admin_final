import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import servicesApi from "../../../../api/servicesApi";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import AddingServiceForm from "../../components/AddingServiceForm";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));
const Services = () => {
	const classes = useStyles();

	const [dataServices, setNotes] = useState([]);
	const [openAddingServiceForm, setOpenAddingServiceForm] = useState(false);

	const [nameService, setNameService] = useState("");
	const [priceService, setPriceService] = useState("");
	const [slotService, setSlotService] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [clickedId, setClickedId] = useState("");

	// get list services
	useEffect(() => {
		const fetchListServices = async () => {
			try {
				const response = await servicesApi.getListServices();
				setNotes(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListServices();
	}, [dataServices]);

	const handleOpenAddingServiceForm = () => {
		setOpenAddingServiceForm(true);
	};

	const handleCloseAddingServiceForm = () => {
		setOpenAddingServiceForm(false);
	};

	// handle adding new service
	const handleAddingSubmit = () => {
		const dataNewService = {
			title: nameService,
			price: priceService,
			quantity: slotService,
		};

		const fetchAddNewService = () => {
			servicesApi
				.addService(dataNewService)
				.then(function (response) {
					setSuccess(true);

					setTimeout(() => {
						setOpenAddingServiceForm(false);
						setSuccess(false);
					}, 1500);
				})
				.catch(function (error) {
					setError(true);
					setTimeout(() => {
						setOpenAddingServiceForm(false);
						setError(false);
					}, 1500);
				});
		};

		fetchAddNewService();
	};

	// handle adding new service
	// const handleEditingSubmit = () => {
	// 	const dataNewService = {
	// 		title: nameService,
	// 		price: priceService,
	// 		quantity: slotService,
	// 	};

	// 	const fetchEditNewService = () => {
	// 		servicesApi
	// 			.patchService(dataNewService)
	// 			.then(function (response) {
	// 				setSuccess(true);

	// 				setTimeout(() => {
	// 					setOpenAddingServiceForm(false);
	// 					setSuccess(false);
	// 				}, 1500);
	// 			})
	// 			.catch(function (error) {
	// 				setError(true);
	// 				setTimeout(() => {
	// 					setOpenAddingServiceForm(false);
	// 					setError(false);
	// 				}, 1500);
	// 			});
	// 	};

	// 	fetchEditNewService();
	// };

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	// handle delete service
	const handleOpenDialog = (id) => {
		setOpenDialog(true);
		setClickedId(id);
	};

	// handle open editing service form
	// const handleOpenEditForm = (id) => {
	// 	setOpenAddingServiceForm(true);
	// 	console.log(id);
	// };

	// handle click confirm delete service
	const handleClickConfirm = (id) => {
		servicesApi
			.deleteService(id)
			.then(function (response) {
				// setSuccess(true);
			})
			.catch(function (error) {
				// setError(true);
			});
		setTimeout(() => {
			setOpenDialog(false);
		}, 500);
	};

	return (
		<React.Fragment>
			<Grid
				container
				style={{ justifyContent: "space-between", marginBottom: "1rem" }}
			>
				<Grid item>
					<Typography variant='h5'>Danh sách các dịch vụ</Typography>
				</Grid>
				<Grid item>
					<Button
						size='large'
						variant='contained'
						color='primary'
						onClick={handleOpenAddingServiceForm}
						startIcon={<AddIcon />}
					>
						Thêm dịch vụ
					</Button>
				</Grid>
			</Grid>
			<AddingServiceForm
				isOpen={openAddingServiceForm}
				onCloseForm={handleCloseAddingServiceForm}
				onNameServiceChange={(e) => setNameService(e.target.value)}
				onPriceServiceChange={(e) => setPriceService(e.target.value)}
				onSlotServiceChange={(e) => setSlotService(e.target.value)}
				onAddingServiceSubmit={handleAddingSubmit}
				onSuccess={success}
				onError={error}
			/>
			<div>
				<Grid container spacing={3}>
					{dataServices.map((data) => (
						<Grid item xs={12} md={6} lg={4} key={data._id}>
							<Card className={classes.root}>
								<CardContent>
									<Typography variant='h6' component='h2'>
										Tên dịch vụ: {data.title}
									</Typography>
									<Typography className={classes.pos} color='textSecondary'>
										Giá: {data.price}
									</Typography>
									<Typography variant='body2' component='p'>
										Số lượng: {data.quantity}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size='small'
										variant='contained'
										color='secondary'
										onClick={() => {
											handleOpenDialog(data._id);
										}}
									>
										Xóa dịch vụ
									</Button>
									{/* <Button
										size='small'
										variant='contained'
										color='primary'
										onClick={(e) => {
											handleOpenEditForm(data._id);
										}}
									>
										Chỉnh sửa
									</Button> */}
									{/* {clickedId === data._id ? (
										<EditServiceForm
											isOpen={openAddingServiceForm}
											onCloseForm={handleCloseAddingServiceForm}
											onNameServiceChange={(e) =>
												setNameService(e.target.value)
											}
											onPriceServiceChange={(e) =>
												setPriceService(e.target.value)
											}
											onSlotServiceChange={(e) =>
												setSlotService(e.target.value)
											}
											nameService={data.title}
											price={data.price}
											quantity={data.quantity}
											onEditingServiceSubmit={handleEditingSubmit}
											onSuccess={success}
											onError={error}
										/>
									) : (
										""
									)} */}
								</CardActions>
							</Card>
							{clickedId === data._id ? (
								<ConfirmDialog
									isOpen={openDialog}
									onClose={handleCloseDialog}
									onClickConfirm={(e) => {
										handleClickConfirm(data._id);
									}}
									id={data._id}
								/>
							) : (
								""
							)}
						</Grid>
					))}
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default Services;
