import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import servicesApi from "../../../../api/servicesApi";
import AddingServiceForm from "../../components/AddingServiceForm";
import ConfirmDeleteService from "../../components/ConfirmDeleteService";
import EditingServiceForm from "../../components/EdtingServiceForm";

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
	const [openEditingServiceForm, setOpenEditingServiceForm] = useState(true);

	const [nameService, setNameService] = useState("");
	const [priceService, setPriceService] = useState("");
	const [slotService, setSlotService] = useState("");

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

	const [clickedDeleteId, setClickedDeleteId] = useState("");

	const [clickedEditingId, setClickedEditingId] = useState("");

	const [isDataChanged, setIsDataChanged] = useState(false);

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
	}, [isDataChanged]);

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
						setIsDataChanged(true);
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

		setIsDataChanged(false);
		fetchAddNewService();
	};

	// handle editing existing services
	const handleEditingSubmit = (id) => {
		const dataNewService = {
			title: nameService,
			price: priceService,
			quantity: slotService,
		};

		const fetchEditNewService = () => {
			servicesApi
				.patchService(id, dataNewService)
				.then(function (response) {
					setSuccess(true);

					setTimeout(() => {
						setIsDataChanged(true);

						setOpenEditingServiceForm(false);
						setSuccess(false);
					}, 1500);
				})
				.catch(function (error) {
					setError(true);
					setTimeout(() => {
						setOpenEditingServiceForm(false);
						setError(false);
					}, 1500);
				});
		};

		setIsDataChanged(false);
		fetchEditNewService();
	};

	// handle open editing service form
	const handleOpenEditForm = (id) => {
		setOpenEditingServiceForm(true);
		setClickedEditingId(id);
	};

	const handleCloseEditForm = () => {
		setOpenEditingServiceForm(false);
	};

	const handleOpenDeleteConfirm = (id) => {
		setOpenDeleteConfirm(true);
		setClickedDeleteId(id);
	};

	const handleCloseDeleteConfirm = (id) => {
		setOpenDeleteConfirm(false);
	};

	// handle click confirm delete service
	const handleClickDeleteConfirm = (id) => {
		console.log("deleted: ", id);
		servicesApi
			.deleteService(id)
			.then(function (response) {
				setSuccess(true);
			})
			.catch(function (error) {
				setError(true);
			});
		setTimeout(() => {
			setOpenDeleteConfirm(false);
			setIsDataChanged(true);
		}, 1500);
		setIsDataChanged(false);
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

			{/* adding service component */}
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
											handleOpenDeleteConfirm(data._id);
										}}
									>
										Xóa dịch vụ
									</Button>
									{clickedDeleteId === data._id ? (
										<ConfirmDeleteService
											isOpen={openDeleteConfirm}
											onClose={handleCloseDeleteConfirm}
											onClickConfirm={(e) => {
												handleClickDeleteConfirm(data._id);
											}}
											id={data._id}
											onSuccess={success}
											onError={error}
											title={data.title}
										/>
									) : (
										""
									)}

									<Button
										size='small'
										variant='contained'
										color='primary'
										onClick={(e) => {
											handleOpenEditForm(data._id);
										}}
									>
										Chỉnh sửa
									</Button>
									{clickedEditingId === data._id ? (
										<EditingServiceForm
											isOpen={openEditingServiceForm}
											onCloseForm={handleCloseEditForm}
											onNameServiceChange={(e) =>
												setNameService(e.target.value)
											}
											onPriceServiceChange={(e) =>
												setPriceService(e.target.value)
											}
											onSlotServiceChange={(e) =>
												setSlotService(e.target.value)
											}
											onEditingServiceSubmit={(e) => {
												handleEditingSubmit(data._id);
											}}
											onSuccess={success}
											onError={error}
											nameService={data.title}
											priceService={data.price}
											slotService={data.quantity}
										/>
									) : (
										""
									)}
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default Services;
