import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React, { useEffect, useState } from "react";
import customerApi from "../../../../api/customerApi";
import DepositUserForm from "../../components/DepositUserForm";

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
  table: {
    minWidth: 650,
  },
}));
const Users = () => {
  const classes = useStyles();

  const [dataUsers, setNotes] = useState([]);
  const [openChangeMoneyForm, setOpenChangeMoneyForm] = useState(false);
  const [openListServiceBought, setOpenListServiceBought] = useState(false);
  const [clickedOpenChangeMoneyFromID, setClickedOpenChangeMoneyFromID] =
    useState("");
  const [clickedOpenListServiceBought, setClickedOpenListServiceBought] =
    useState("");
  const [newMoney, setNewMoney] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeMoneyOpen = (id) => {
    setOpenChangeMoneyForm(true);
    setClickedOpenChangeMoneyFromID(id);
  };

  const handleChangeMoneyClose = () => {
    setOpenChangeMoneyForm(false);
  };

  const handleListServiceBoughtOpen = (id) => {
    setOpenListServiceBought(true);
    setClickedOpenListServiceBought(id);
  };

  const handleListServiceBoughtClose = () => {
    setOpenListServiceBought(false);
  };

  // get list info users
  useEffect(() => {
    const fetchGetListUsers = async () => {
      try {
        const response = await customerApi.getListUsers();
        setNotes(response.data);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };

    fetchGetListUsers();
  }, []);

  // handle change money of users
  const handleSubmit = (idUser) => {
    console.log(idUser);
    if (idUser && newMoney) {
      const dataNewMoney = {
        newMoney: newMoney,
      };

      const fetchChangeMoney = () => {
        customerApi
          .patchMoney(idUser, dataNewMoney)
          .then(function (response) {
            setSuccess(true);

            setTimeout(() => {
              setOpenChangeMoneyForm(false);
              setSuccess(false);
            }, 1500);
          })
          .catch(function (error) {
            setError(true);
            setTimeout(() => {
              setOpenChangeMoneyForm(false);
              setError(false);
            }, 1500);
          });
      };

      fetchChangeMoney();
    }
  };

  // get list service users bought
  // useEffect(
  // 	(clickedOpenListServiceBought) => {
  // 		console.log(clickedOpenListServiceBought);

  // 		if (clickedOpenListServiceBought) {
  // 			const fetchListServiceUserBought = async () => {
  // 				try {
  // 					const response = await customerApi.getListServerUserBought(
  // 						clickedOpenListServiceBought
  // 					);
  // 					console.log(response);
  // 					console.log(clickedOpenListServiceBought);
  // 					setNotes(response.data);
  // 				} catch (error) {
  // 					console.log("failed to fetch product list: ", error);
  // 				}
  // 			};
  // 			fetchListServiceUserBought();
  // 		}
  // 	},
  // 	[clickedOpenListServiceBought]
  // );

  return (
    <React.Fragment>
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>
        Danh sách người dùng
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Report</TableCell>
              <TableCell>Tư vấn trực tiếp</TableCell>
              <TableCell>Số tiền </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataUsers.map((data, index) => (
              <TableRow key={data._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  <Grid container alignItems="center">
                    <Grid item style={{ paddingRight: "5px" }}>
                      {data.serviceBought}
                    </Grid>
                    {/* <Grid item>
											<Tooltip title='Thông tin dịch vụ đã mua'>
												<IconButton
													aria-label='deposit'
													type='button'
													onClick={() => handleListServiceBoughtOpen(data._id)}
												>
													<CheckBoxOutlinedIcon color='secondary' />
												</IconButton>
											</Tooltip>
										</Grid> */}
                    {/* {data._id === clickedOpenListServiceBought ? (
											<ListServiceBought
												nameUser={data.name}
												idListService={data._id}
												isOpenForm={openListServiceBought}
												onCloseForm={handleListServiceBoughtClose}
											/>
										) : (
											""
										)} */}
                  </Grid>
                </TableCell>

                <TableCell>
                  <Grid container alignItems="center">
                    <Grid item md={6}>
                      {data.trucTiep}
                    </Grid>
                    <Grid item md={6}>
                      <Tooltip title="Chỉnh sửa lần gặp">
                        <IconButton aria-label="meet" type="button">
                          <AddOutlinedIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container alignItems="center">
                    <Grid item md={6}>
                      {data.money}
                    </Grid>
                    <Grid item md={6}>
                      <Tooltip title="Chỉnh sửa ngân lượng">
                        <IconButton
                          aria-label="deposit"
                          type="button"
                          onClick={() => handleChangeMoneyOpen(data._id)}
                        >
                          <AddOutlinedIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  {data._id === clickedOpenChangeMoneyFromID ? (
                    <DepositUserForm
                      nameUserChange={data.name}
                      idUserChange={data._id}
                      isOpenForm={openChangeMoneyForm}
                      onCloseForm={handleChangeMoneyClose}
                      onChangeMoneyFormSubmit={handleSubmit}
                      onFormChange={(e) =>
                        setNewMoney(parseInt(e.target.value))
                      }
                      onSuccess={success}
                      onError={error}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Users;
