import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import React, { useEffect, useState } from "react";
import directMeeting from "../../../../api/directMeeting";
import AddingCoachingService from "../../components/AddingServiceForm";
import EditingServiceForm from "../../components/EdtingServiceForm";
import NoteSearchFree from "../../components/NoteSearchFree";

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
		marginBottom: 5,
	},
}));
const DirectMeeting = () => {
	const classes = useStyles();

	const [openEditingServiceForm, setOpenEditingServiceForm] = useState(true);
	const [openAddingCoaching, setOpenAddingCoaching] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [clickedId, setClickedId] = useState("");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [birthDay, setBirthDay] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const [listDirectMeet, setListDirectMeet] = useState([]);

	const [isDataChanged, setIsDataChanged] = useState(false);

	// get list direct meet
	useEffect(() => {
		const fetchListDirectMeet = async () => {
			try {
				const response = await directMeeting.getListDirectMeet();
				setListDirectMeet(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListDirectMeet();
	}, [isDataChanged]);

	const handleOpenAddingCoaching = () => {
		setOpenAddingCoaching(true);
	};

	const handleCloseAddingCoaching = () => {
		setOpenAddingCoaching(false);
	};

	// handle adding new service
	const handleAddingCoachingSubmit = () => {
		const useInfo = {
			name: name,
			email: email,
			birthDay: birthDay,
			phoneNumber: phoneNumber,
			address: address,
		};

		const fetchAddCoaching = () => {
			directMeeting
				.postNewDirectMeeting(useInfo)
				.then(function (response) {
					setSuccess(true);
					setTimeout(() => {
						setOpenAddingCoaching(false);
						setSuccess(false);
						setIsDataChanged(true);
					}, 1500);
				})
				.catch(function (error) {
					setError(true);
					setTimeout(() => {
						setOpenAddingCoaching(false);
						setError(false);
					}, 1500);
				});
		};
		setIsDataChanged(false);
		fetchAddCoaching();
	};

	const [openNote, setOpenNote] = useState(false);
	const [clickedIdChangeForm, setClickedIdChangeForm] = useState("");
	const [newNote, setNewNote] = useState("");

	const handleChangeNoteClose = () => {
		setOpenNote(false);
	};

	const handleOpenEditNote = (id) => {
		setOpenNote(true);
		setClickedIdChangeForm(id);
	};

	// handle change content of note
	const handleNoteSubmit = (id) => {
		if (id && newNote) {
			const dataNewNote = {
				note: newNote,
			};

			const fetchChangeNote = () => {
				directMeeting
					.patchEditNote(id, dataNewNote)
					.then(function (response) {
						setSuccess(true);

						setTimeout(() => {
							setNewNote(response.data.note);

							setOpenNote(false);
							setSuccess(false);
							setIsDataChanged(true);
						}, 1500);
					})
					.catch(function (error) {
						setError(true);
						setTimeout(() => {
							setOpenNote(false);
							setError(false);
						}, 1500);
					});
			};
			setIsDataChanged(false);

			fetchChangeNote();
		}
	};

	return (
		<React.Fragment>
			<Grid
				container
				style={{ justifyContent: "space-between", marginBottom: "1rem" }}
			>
				<Grid item>
					<Typography variant='h5'>
						Danh sách sử dụng dịch vụ Coaching
					</Typography>
				</Grid>
				<Grid item>
					<Button
						size='large'
						variant='contained'
						color='primary'
						onClick={handleOpenAddingCoaching}
						startIcon={<AddIcon />}
					>
						Thêm COACHING
					</Button>
				</Grid>
			</Grid>

			{/* adding coaching service form */}
			<AddingCoachingService
				isOpen={openAddingCoaching}
				onCloseForm={handleCloseAddingCoaching}
				onNameChange={(e) => setName(e.target.value)}
				onEmailChange={(e) => setEmail(e.target.value)}
				onBirthDayChange={(e) => setBirthDay(e.target.value)}
				onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
				onAddressChange={(e) => setAddress(e.target.value)}
				onAddingCoachingSubmit={handleAddingCoachingSubmit}
				onSuccess={success}
				onError={error}
			/>

			<div>
				<Grid container spacing={3}>
					{listDirectMeet.length > 0 ? (
						listDirectMeet.map((data) => (
							<Grid item xs={12} md={6} lg={4} key={data._id}>
								<Card className={classes.root}>
									<CardContent>
										<Typography
											variant='h6'
											component='h2'
											style={{ marginBottom: "1rem" }}
										>
											{data.name} - {moment(data.birthDay).format("DD/MM/YYYY")}
										</Typography>

										<Typography className={classes.pos} color='textSecondary'>
											SĐT: {data.phoneNumber}
										</Typography>
										<Typography className={classes.pos} color='textSecondary'>
											Email: {data.email}
										</Typography>
										<Typography className={classes.pos} color='textSecondary'>
											Địa chỉ: {data.address}
										</Typography>
										<Typography
											variant='body2'
											component='p'
											style={{ color: "#d500f9" }}
										>
											Note: {data.note}{" "}
										</Typography>
									</CardContent>
									<CardActions>
										<Button
											size='small'
											variant='contained'
											color='primary'
											onClick={(e) => {
												handleOpenEditNote(data._id);
											}}
										>
											note
										</Button>
										{data._id === clickedIdChangeForm ? (
											<NoteSearchFree
												nameUserChange={data.name}
												idUserChange={data._id}
												isOpenForm={openNote}
												onCloseForm={handleChangeNoteClose}
												onChangeNoteSubmit={handleNoteSubmit}
												onFormChange={(e) => setNewNote(e.target.value)}
												onSuccess={success}
												onError={error}
												currentNote={data.note}
											/>
										) : (
											""
										)}
									</CardActions>
								</Card>
							</Grid>
						))
					) : (
						<Alert severity='success' color='info'>
							Chưa có dữ liệu
						</Alert>
					)}
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default DirectMeeting;
