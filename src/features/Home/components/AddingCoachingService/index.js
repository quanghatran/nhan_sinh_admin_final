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
import moment from "moment";

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
		maxWidth: 500,
	},
}));

const date = new Date();

const AddingCoachingService = (props) => {
	const classes = useStyles();
	const {
		isOpen,
		onCloseForm,
		onNameChange,
		onEmailChange,
		onBirthDayChange,
		onPhoneNumberChange,
		onAddressChange,
		onAddingCoachingSubmit,
		onSuccess,
		onError,
	} = props;

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddingCoachingSubmit();
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
								Thêm mới người đặt lịch dịch vụ coaching
							</Typography>

							<form autoComplete='off' onSubmit={handleSubmit}>
								<TextField
									className={classes.field}
									label='Họ Tên'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									style={{ marginBottom: "1rem" }}
									onChange={onNameChange}
								/>
								<TextField
									className={classes.field}
									label='Ngày Sinh'
									variant='outlined'
									color='secondary'
									fullWidth
									type='date'
									style={{ marginBottom: "1rem" }}
									onChange={onBirthDayChange}
								/>
								<TextField
									className={classes.field}
									label='Số Điện Thoại'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									style={{ marginBottom: "1rem" }}
									onChange={onPhoneNumberChange}
								/>
								<TextField
									className={classes.field}
									label='Email'
									variant='outlined'
									color='secondary'
									fullWidth
									type='email'
									style={{ marginBottom: "1rem" }}
									onChange={onEmailChange}
								/>
								<TextField
									className={classes.field}
									label='Địa Chỉ'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									style={{ marginBottom: "1rem" }}
									onChange={onAddressChange}
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
							<Alert
								variant='filled'
								severity='success'
								style={{ marginTop: "1rem", justifyContent: "center" }}
							>
								Đặt lịch cho khách hàng thành công
							</Alert>
							{onError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}
								>
									Đặt lịch cho khách hàng không thành công
								</Alert>
							)}
						</Container>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

export default AddingCoachingService;
