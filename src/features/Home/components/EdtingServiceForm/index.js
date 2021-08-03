import {
	Button,
	Container,
	Fade,
	Modal,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React from "react";

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

const EditingServiceForm = (props) => {
	const classes = useStyles();
	const {
		isOpen,
		onCloseForm,
		onNameServiceChange,
		onPriceServiceChange,
		onSlotServiceChange,
		onEditingServiceSubmit,
		onSuccess,
		onError,
		nameService,
		priceService,
		slotService,
	} = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		onEditingServiceSubmit();
	};

	return (
		<React.Fragment>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={isOpen}
				onClose={onCloseForm}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isOpen}>
					<div className={classes.paper}>
						<Container size='sm'>
							<Typography variant='h5' style={{ marginBottom: "1rem" }}>
								Chỉnh sửa dịch vụ
							</Typography>

							<form autoComplete='off' onSubmit={handleSubmit}>
								<TextField
									className={classes.field}
									label='Tên dịch vụ'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									style={{ marginBottom: "1rem" }}
									// defaultValue={nameService}
									onChange={onNameServiceChange}
									required={true}
								/>
								<TextField
									className={classes.field}
									label='Giá'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									style={{ marginBottom: "1rem" }}
									// defaultValue={priceService}
									onChange={onPriceServiceChange}
									required={true}
								/>
								<TextField
									className={classes.field}
									label='Số lượt tra cứu VIP'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									style={{ marginBottom: "1rem" }}
									// defaultValue={slotService}
									onChange={onSlotServiceChange}
									required={true}
								/>

								<Button
									color='secondary'
									variant='contained'
									onClick={onCloseForm}
								>
									Hủy bỏ
								</Button>
								<Button
									style={{ float: "right" }}
									type='submit'
									color='primary'
									variant='contained'
								>
									Xác nhận
								</Button>
							</form>
							{onSuccess && (
								<Alert
									variant='filled'
									severity='success'
									style={{ marginTop: "1rem", justifyContent: "center" }}
								>
									Sửa dịch vụ thành công
								</Alert>
							)}
							{onError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}
								>
									Sửa dịch vụ thất bại
								</Alert>
							)}
						</Container>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

export default EditingServiceForm;
