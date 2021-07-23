import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
	return (
		<Draggable
			handle='#draggable-dialog-title'
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

export default function ConfirmDialog(props) {
	const { isOpen, onClose, onClickConfirm, id, onSuccess, onError } = props;

	const handleClick = (id) => {
		onClickConfirm(id);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			PaperComponent={PaperComponent}
			aria-labelledby='draggable-dialog-title'
		>
			<DialogTitle style={{ cursor: "move" }} id='draggable-dialog-title'>
				Xác nhận
			</DialogTitle>
			<DialogContent>
				<DialogContentText>Bạn có chắc chắc xóa dịch vụ này</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={onClose}
					color='secondary'
					variant='contained'
				>
					Hủy
				</Button>
				<Button
					onClick={(e) => {
						handleClick(id);
					}}
					color='primary'
					variant='contained'
					type='button'
				>
					Xác nhận
				</Button>
			</DialogActions>
		</Dialog>
	);
}
