import { Button, Container, Fade, Modal, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
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

const ListServiceBought = (props) => {
	const classes = useStyles();
	const { nameUser, idListService, isOpenForm, onCloseForm } = props;

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
							Danh sách dịch vụ
							<span
								style={{
									fontWeight: "bold",
									margin: "0 5px",
									fontStyle: "italic",
								}}
							>
								{nameUser}
							</span>
							đã mua
						</Typography>

						{/* <form
							noValidate
							autoComplete='off'
							onSubmit={(e) => {
								onChangeMoneyFormSubmit(idListService);
							}}
						>
							<TextField
								className={classes.field}
								label='Số tiền mới'
								variant='outlined'
								color='secondary'
								fullWidth
								type='number'
								style={{ marginBottom: "1rem" }}
								onChange={onFormChange}
							/>
							<Button
								color='secondary'
								variant='contained'
								onClick={onCloseForm}
								float
							>
								Hủy
							</Button>
							<Button
								style={{ float: "right" }}
								type='submit'
								color='primary'
								variant='contained'
							>
								Xác nhận
							</Button>
						</form> */}

						<Button
							type='submit'
							color='secondary'
							variant='contained'
							onClick={onCloseForm}
						>
							Đóng
						</Button>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default ListServiceBought;
