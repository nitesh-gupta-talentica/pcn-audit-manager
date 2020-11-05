import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
} from "@material-ui/core";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SectionComponent from "./section";
import MenuComponent from "../MenuComponent";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const InspectionFormComponent = (props) => {
  const [inspectionData, setInspectionData] = useState(
    JSON.parse(localStorage.getItem("inspectionForms"))
  );
  const classes = useStyles();
  const [reviewType, setReviewType] = React.useState("");
  const [formType, setFormType] = React.useState("");
  const [sectionValue, setSectionValue] = React.useState([]);
  const [facility, setFacility] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [formName, setformName] = React.useState("");
  const [sections, setSections] = React.useState([]);
  const [sectionData, setSectionData] = React.useState({});

  const handleChangeReviewType = (event) => {
    setReviewType(event.target.value);
  };

  const handleChangeFormType = (event) => {
    setFormType(event.target.value);
  };

  const handleChangeFacility = (event) => {
    setFacility(event.target.value);
  };

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleChangeformName = (event) => {
    setformName(event.target.value);
  };

  const [openForm, setOpenForm] = React.useState(false);
  const [openViewForm, setOpenViewForm] = React.useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSectionData({});
    setSections([]);
    setFormType("");
    setformName("");
    setOpenForm(false);
  };

  const getSectionData = (key, sectionName, questions) => {
    sectionData[key] = {
      sectionName,
      questions,
    };
    setSectionData(sectionData);
  };

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      "https://9z3k7jzo2i.execute-api.us-west-2.amazonaws.com/prod/forms?company=Nike",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setInspectionData(data);
        localStorage.setItem("inspectionForms", JSON.stringify(data));
      });
  }, []);

  return (
    <Grid container>
      <MenuComponent />
      <Dialog
        open={openViewForm}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Inspection form</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={4}>
              Form Type
            </Grid>
            <Grid item md={8}>
              {formType}
            </Grid>
            <Grid item md={4}>
              Form Name
            </Grid>
            <Grid item md={8}>
              {formName}
            </Grid>
            {sectionValue.map((sec, index) => {
              return (
                <>
                  <Grid item md={4}>
                    <b>Section {index + 1}</b>
                  </Grid>
                  <Grid item md={8}>
                    <b>{sec.sectionName}</b>
                  </Grid>
                  {Object.values(sec.questions).map((que, ind) => {
                    return (
                      <>
                        <Grid item md={4}>
                          Question {ind + 1}
                        </Grid>
                        <Grid item md={8}>
                          {que.questionData.question}
                        </Grid>
                      </>
                    );
                  })}
                </>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewForm(false)} color="primary">
            Cancel
          </Button>{" "}
        </DialogActions>
      </Dialog>
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
            {/* <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Review type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={reviewType}
                  onChange={handleChangeReviewType}
                >
                  <MenuItem value={10}>Inspection</MenuItem>
                  <MenuItem value={20}>formName</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Form type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formType}
                  onChange={handleChangeFormType}
                >
                  <MenuItem value="inspection">Inspection</MenuItem>
                  <MenuItem value="audit">Audit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Facility</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={facility}
                  onChange={handleChangeFacility}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={company}
                  onChange={handleChangeCompany}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={6}>
              <TextField
                required
                id="formName-name"
                name="formName-name"
                label="Form Name"
                value={formName}
                fullWidth
                autoComplete="formName-name"
                onChange={handleChangeformName}
              />
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  setSections([
                    ...sections,
                    <SectionComponent
                      uniqueKey={Date.now()}
                      getSectionData={getSectionData}
                    />,
                  ]);
                }}
              >
                Add Section
              </Button>
              &nbsp;
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  const section = sections.pop();
                  delete sectionData[section.props.uniqueKey];
                  setSectionData(sectionData);
                  setSections([...sections]);
                }}
              >
                Remove Section
              </Button>
            </Grid>

            {sections.map((section) => {
              return section;
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const formData = {};
              formData["formName"] = formName;
              formData["form_name"] = formName;
              formData["form_creater"] = "Nike";
              formData["formType"] = formType;
              formData["sections"] = Object.values(sectionData);
              console.log(formData);

              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              };
              fetch(
                "https://9z3k7jzo2i.execute-api.us-west-2.amazonaws.com/prod/forms",
                requestOptions
              )
                .then((response) => response.json())
                .then((data) => {});

              setInspectionData([...inspectionData, formData]);
              localStorage.setItem(
                "inspectionForms",
                JSON.stringify([...inspectionData, formData])
              );
              setSectionData({});
              setOpenForm(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item md={12}>
        <Typography variant="h5" align="center" component="h5">
          Create Inspection forms
        </Typography>
        <Box p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenForm}
          >
            Add Form
          </Button>
        </Box>
      </Grid>
      <Grid item md={12}>
        <Typography variant="h6" align="center" component="h6">
          Inspection forms
        </Typography>
      </Grid>
      <Grid item md={12}>
        <div className="ag-theme-alpine grid-main">
          <AgGridReact
            rowData={inspectionData}
            rowSelection="single"
            onRowClicked={(event) => {
              setformName(event.api.getSelectedRows()[0].formName);
              setFormType(event.api.getSelectedRows()[0].formType);
              setSectionValue(event.api.getSelectedRows()[0].sections || []);
              setOpenViewForm(true);
            }}
          >
            {/* <AgGridColumn
              field="reviewType"
              sortable={true}
              filter={true}
            ></AgGridColumn> */}
            <AgGridColumn
              field="formType"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="formName"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            {/* <AgGridColumn
              field="formName"
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="facility"
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="company"
              sortable={true}
              filter={true}
            ></AgGridColumn> */}
          </AgGridReact>
        </div>
      </Grid>
    </Grid>
  );
};
export default InspectionFormComponent;
