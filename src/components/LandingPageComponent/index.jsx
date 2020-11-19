import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Container,
  Typography,
  Col,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  TextField,
  IconButton,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import MenuComponent from "../MenuComponent";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import MenuIcon from "@material-ui/icons/Menu";
// import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
// import "../../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LandingPageComponent = (props) => {
  const user = localStorage.getItem("user");
  const classes = useStyles();
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [formData, setFormData] = useState({
    facilityId: "",
    facilityName: "",
    facilityCompany: "",
    facilityParentCompany: "",
    facilityType: "",
    facilityAddress: "",
    countryCode: "",
    facilityContactPerson: "",
    createdDate: "",
  });
  const [facilitiesData, setFacilitiesData] = useState([]);

  console.log(facilitiesData);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpenForm = () => {
    console.log("button clicked");
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleInputChange = (field, data) => {
    const formDataClone = JSON.parse(JSON.stringify(formData));
    formDataClone[field] = data;
    setFormData(formDataClone);
  };

  const handleSave = () => {
    const facilitiesDataClone = JSON.parse(JSON.stringify(facilitiesData));
    const formDataClone = JSON.parse(JSON.stringify(formData));
    formDataClone.facilityId = Number.parseInt(
      Math.random() * 100000
    ).toString();
    formDataClone.createdDate = moment().format("MM/DD/YYYY");
    formDataClone.entity_name = user;
    facilitiesDataClone.push(formDataClone);
    console.log(facilitiesDataClone);
    setFacilitiesData(facilitiesDataClone);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataClone),
    };
    fetch(
      "https://9z3k7jzo2i.execute-api.us-west-2.amazonaws.com/prod/facilities",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {});

    localStorage.setItem("facilitiesData", JSON.stringify(facilitiesDataClone));
    handleCloseForm();
  };

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      "https://9z3k7jzo2i.execute-api.us-west-2.amazonaws.com/prod/facilities?company=" +
        user,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setFacilitiesData(data);
        localStorage.setItem("facilitiesData", JSON.stringify(data));
      });

    console.log(facilitiesData);
  }, []);

  return (
    <React.Fragment>
      <MenuComponent />
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Add Facility</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Facility Name
                </InputLabel>
                <Input
                  value={formData.facilityName}
                  onChange={(event) =>
                    handleInputChange("facilityName", event.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Facility Company
                </InputLabel>
                <Input
                  value={formData.facilityCompany}
                  onChange={(event) =>
                    handleInputChange("facilityCompany", event.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Facility Parent-Company
                </InputLabel>
                <Input
                  value={formData.facilityParentCompany}
                  onChange={(event) =>
                    handleInputChange(
                      "facilityParentCompany",
                      event.target.value
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Facility Type
                </InputLabel>
                <Select
                  value={formData.facilityType}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(event) =>
                    handleInputChange("facilityType", event.target.value)
                  }
                >
                  <MenuItem value="Farm">Farm/Ranch/Plantation</MenuItem>
                  <MenuItem value="Mill">Gin/Mill/Processing-Plant</MenuItem>
                  <MenuItem value="Refinery">Refinery/Cannery/Winery</MenuItem>
                  <MenuItem value="Factory">Factory</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Facility Address
                </InputLabel>
                <Input
                  value={formData.facilityAddress}
                  multiline
                  onChange={(event) =>
                    handleInputChange("facilityAddress", event.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Country Code
                </InputLabel>
                <Input
                  value={formData.countryCode}
                  onChange={(event) =>
                    handleInputChange("countryCode", event.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Facility SME Team
                </InputLabel>
                <Input
                  value={formData.facilityContactPerson}
                  onChange={(event) =>
                    handleInputChange(
                      "facilityContactPerson",
                      event.target.value
                    )
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}></Grid>
            {/* <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  <CalendarTodayIcon /> Created Date
                </InputLabel>
              </FormControl>

              <DatePicker
                labelId="demo-simple-select-label"
                className="MuiInputBase-input"
                // selected={selectedDate}
                // onChange={handleDateChange}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={() => handleClickOpenForm()}
                >
                  Save
                </Button>
              </FormControl>
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container>
        <Grid item md={12}>
          <Typography variant="h5" align="center" component="h5">
            Add Facilities
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpenForm()}
            >
              Add Facility
            </Button>
          </Box>
          <Grid item md={12}>
            <Typography variant="h6" align="center" component="h6">
              Facilities
            </Typography>
          </Grid>
          <div className="ag-theme-alpine grid-main">
            <AgGridReact
              rowData={facilitiesData}
              rowSelection="single"
              onRowClicked={(event) => {
                setFormData(event.api.getSelectedRows()[0]);
                handleClickOpenForm();
              }}
            >
              <AgGridColumn
                field="facility_id"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="facilityName"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="facilityCompany"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="facilityParentCompany"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="facilityType"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="facilityAddress"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="countryCode"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="facilityContactPerson"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
              <AgGridColumn
                field="createdDate"
                sortable={true}
                filter={true}
                resizable
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default LandingPageComponent;
