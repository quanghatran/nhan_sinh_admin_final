import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Fade,
	Grid,
	Modal,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import servicesApi from "../../../../api/servicesApi";
import ConfirmDeleteService from "../ConfirmDeleteService";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const AddingSlotVip = (props) => {
	const classes = useStyles();
	const {
		nameUserChange,
		isOpenForm,
		onCloseForm,
		setIdService,
		onClickConfirmDeleteService,
		onSuccess,
		onError,
	} = props;

	const [dataServices, setDataService] = useState([]);

	const [isConfirmDeleteServiceOpen, setIsConfirmDeleteServiceOpen] =
		useState(false);

	const handleAddingSlotVip = (id) => {
		setIdService(id);
		setIsConfirmDeleteServiceOpen(true);
	};

	const onConfirmDeleteServiceClose = () => {
		setIsConfirmDeleteServiceOpen(false);
	};

	// get list services
	useEffect(() => {
		const fetchListServices = async () => {
			try {
				const response = await servicesApi.getListServices();
				setDataService(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListServices();
	}, []);

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			className={classes.modal}
			open={isOpenForm}
			onClose={onCloseForm}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={isOpenForm}>
				<div className={classes.paper}>
					<Container size='sm'>
						<Typography variant='h5' style={{ marginBottom: "1rem" }}>
							Thêm dịch vụ cho:
							<span
								style={{
									fontWeight: "bold",
									margin: "0 5px",
									fontStyle: "italic",
								}}
							>
								{nameUserChange}
							</span>
						</Typography>

						{dataServices.length > 0 ? (
							dataServices.map((data) => (
								<div
									key={data._id}
									style={{
										marginBottom: "2rem",
									}}
								>
									<Typography variant='h6' component='h2'>
										{data.title}{" "}
										<span style={{ fontSize: "1rem", fontWeight: "lighter" }}>
											(Giá: {data.price} - {data.quantity} lượt tra cứu VIP)
										</span>{" "}
									</Typography>{" "}
									<Button
										color='primary'
										variant='contained'
										size='small'
										onClick={(e) => {
											handleAddingSlotVip(data._id);
										}}
									>
										Thêm service cho USER
									</Button>
								</div>
							))
						) : (
							<Alert severity='success' color='info'>
								Chưa có dữ liệu
							</Alert>
						)}

						<div style={{ textAlign: "center" }}>
							<Button
								color='secondary'
								variant='contained'
								onClick={onCloseForm}
							>
								Đóng
							</Button>
						</div>

						<ConfirmDeleteService
							isConfirmDeleteServiceOpen={isConfirmDeleteServiceOpen}
							onConfirmDeleteServiceClose={onConfirmDeleteServiceClose}
							onClickConfirmDeleteService={onClickConfirmDeleteService}
							onSuccess={onSuccess}
							onError={onError}
						/>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default AddingSlotVip;
