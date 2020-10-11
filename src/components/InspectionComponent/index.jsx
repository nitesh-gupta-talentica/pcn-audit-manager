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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const InspectionComponent = (props) => {
  const [inspectionData, setInspectionData] = useState([]);

  const classes = useStyles();
  const [reviewType, setReviewType] = React.useState("");
  const [formType, setFormType] = React.useState("");
  const [facility, setFacility] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [audit, setAudit] = React.useState("");
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

  const handleChangeAudit = (event) => {
    setAudit(event.target.value);
  };

  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const getSectionData = (key, sectionName, questions) => {
    sectionData[key] = {
      sectionName,
      questions,
    };
    setSectionData(sectionData);
  };

  return (
    <Grid container>
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Inspection form</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={3} sm={3}>
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Form type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formType}
                  onChange={handleChangeFormType}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={3}>
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
            <Grid item xs={3} sm={3}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="audit-name"
                name="audit-name"
                label="Audit name"
                value={audit}
                fullWidth
                autoComplete="audit-name"
                onChange={handleChangeAudit}
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
              formData["reviewType"] = reviewType;
              formData["facility"] = facility;
              formData["company"] = company;
              formData["auditName"] = audit;
              formData["formType"] = formType;
              formData["sections"] = Object.values(sectionData);
              console.log(formData);
              setInspectionData([...inspectionData, formData]);
              setSectionData({});
              setOpenForm(false);

            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item md={12}>
        <Typography variant="h4" component="h4">
          Inspection forms
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
        <div className="ag-theme-alpine grid-main">
          <AgGridReact rowData={inspectionData}>
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
              field="auditName"
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
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </Grid>
    </Grid>
  );
};
export default InspectionComponent;
