import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
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
  const classes = useStyles();
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [facilitiesData, setFacilitiesData] = useState([
    { reviewType: "Type1", formType: "Celica", inspetionName: "Name1" },
    { reviewType: "Type2", formType: "Mondeo", inspetionName: "Name2" },
    { reviewType: "Type3", formType: "Boxter", inspetionName: "Name3" },
  ]);

  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpenForm = () => {
    console.log("button clicked");
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Inspection form</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Review type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Form type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Inspection Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Inspection Id
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Lead Inspector Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Lead Inspector Company
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Inspection Team
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Review Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>R1</MenuItem>
                  <MenuItem value={20}>R2</MenuItem>
                  <MenuItem value={30}>R3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Created Date
                </InputLabel>
                <DatePicker
                  className="MuiInputBase-input"
                  // selected={selectedDate}
                  // onChange={handleDateChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Grid container>
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
          <div className="ag-theme-alpine grid-main">
            <AgGridReact rowData={facilitiesData}>
              <AgGridColumn
                field="reviewType"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="formType"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="inspetionName"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="InspectionID"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="leadInspectorName"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="leadInspectorCo"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="inspectionTeam"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="reviewLevel"
                sortable={true}
                filter={true}
              ></AgGridColumn>
              <AgGridColumn
                field="createdDate"
                sortable={true}
                filter={true}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default LandingPageComponent;
