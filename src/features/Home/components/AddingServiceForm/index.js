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
  field: {
    marginBottom: "1rem",
  },
}));

const AddingServiceForm = (props) => {
  const classes = useStyles();
  const {
    isAddingServiceOpen,
    onCloseForm,
    valuesService,
    onValuesServiceChange,
    onAddingServiceSubmit,
    onSuccess,
    onError,
  } = props;
  const [details, setDetails] = React.useState(valuesService.details);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddingServiceSubmit({ ...valuesService, details });
  };
  const addDetailsItem = () => {
    const newDetails = [...details];
    newDetails.push("");
    setDetails(newDetails);
  };
  const removeDetailsItem = (index) => {
    const newDetails = Details.filter((item, s_index) => index !== s_index);
    setDetails(newDetails);
  };
  const handleChangeDetail = (index) => (e) => {
    const newDetails = Details.map((item, s_index) => {
      if (index !== s_index) return item;
      return e.target.value;
    });
    setDetails(newDetails);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isAddingServiceOpen}
        onClose={onCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isAddingServiceOpen}>
          <div className={classes.paper}>
            <Container size="sm">
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Th??m m???i d???ch v???
              </Typography>

              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  className={classes.field}
                  label="T??n d???ch v???"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="text"
                  onChange={onValuesServiceChange}
                  required={true}
                  name="title"
                />
                <TextField
                  className={classes.field}
                  label="Gi??"
                  placeholder="VN??"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  onChange={onValuesServiceChange}
                  required={true}
                  name="price"
                />
                <TextField
                  className={classes.field}
                  label="S??? l?????t tra c???u VIP"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  onChange={onValuesServiceChange}
                  required={true}
                  name="quantity"
                />
                {details.map((item, index) => {
                  return (
                    <div>
                      <TextField
                        className={classes.field}
                        label="Chi ti???t d???ch v???"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onChange={(e) => handleChangeDetail(index)(e)}
                        required={true}
                        name="quantity"
                      />
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => removeDetailsItem(index)}
                      >
                        X??a
                      </Button>
                    </div>
                  );
                })}

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onCloseForm}
                >
                  H???y b???
                </Button>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  X??c nh???n
                </Button>
                <Button
                  style={{ float: "right" }}
                  color="primary"
                  variant="contained"
                  onClick={addDetailsItem}
                >
                  Th??m m?? t???
                </Button>
              </form>
              {onSuccess && (
                <Alert
                  variant="filled"
                  severity="success"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Th??m m???i d???ch v??? th??nh c??ng
                </Alert>
              )}
              {onError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                  Th??m m???i d???ch v??? th???t b???i
                </Alert>
              )}
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default AddingServiceForm;
