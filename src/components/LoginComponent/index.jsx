import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import usersData from "data/usersData.json";
import logo from "assets/images/logo.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tncContainer: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    background: theme.palette.common.white,
    padding: "3rem",
    borderRadius: "0.3rem",
    maxWidth: "25rem",
    width: "60%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  tcnBtn: {
    borderRadius: "5rem",
    minWidth: "15rem",
    fontWeight: "600",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [showProgress, setShowProgress] = React.useState(false);
  const [dataFetched, setDataFetched] = React.useState(0);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  localStorage.setItem("referenceDate", selectedDate);

  const handleDateChange = (date) => {
    localStorage.setItem("referenceDate", date);
    setSelectedDate(date);
  };

  const onGetOrderData = (fileData, user) => {
    setDataFetched(dataFetched + 1);
    localStorage.setItem("brand", user.brand);
    localStorage.setItem("role", user.role);
    localStorage.setItem("managers", JSON.stringify(user.managers));
    localStorage.setItem("ordersData", JSON.stringify(fileData));
    history.push("/");
  };
  const onGetSiteInspectionData = (fileData, user) => {
    setDataFetched(dataFetched + 1);
    localStorage.setItem("siteInspection", JSON.stringify(fileData));
  };
  const onGetProvonomicsData = (fileData, user) => {
    setDataFetched(dataFetched + 1);
    localStorage.setItem("pools", JSON.stringify(fileData));
  };
  const signIn = () => {
    setShowProgress(true);
    const user = usersData.users.filter((user) => user.email === email)[0];
    if (user) {
      localStorage.setItem("facilitiesData", JSON.stringify([]));
      localStorage.setItem("inspectionForms", JSON.stringify([]));
      history.push("/");
      // fetch(user.ordersData, { method: "GET" })
      //   .then((res) => res.json())
      //   .then((res) => onGetOrderData(res, user))
      //   .catch((err) => console.log("Error Loggin In", err));
      // fetch(user.siteInspectionData, { method: "GET" })
      //   .then((res) => res.json())
      //   .then((res) => onGetSiteInspectionData(res, user))
      //   .catch((err) => console.log("Error Loggin In", err));
      // fetch(user.provonomicsData, { method: "GET" })
      //   .then((res) => res.json())
      //   .then((res) => onGetProvonomicsData(res, user))
      //   .catch((err) => console.log("Error Loggin In", err));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.tncContainer} boxShadow={5}>
        <div className={classes.paper}>
          <img src={logo} alt="Logo" className="logo" />
          <br />
          <br />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <br />

          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.tcnBtn}
            onClick={() => signIn()}
          >
            Sign In
          </Button>
          <br />
          {showProgress && <CircularProgress />}
        </div>
      </Box>
    </Container>
  );
};

export default LoginComponent;
