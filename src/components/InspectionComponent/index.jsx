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
  Input,
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
import MenuComponent from "../MenuComponent";
import SectionComponent from "./section";
import FormComponent from "./from";

const date = new Date();

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const InspectionComponent = (props) => {
  const [inspectionData, setInspectionData] = useState([]);
  const user = localStorage.getItem("user");
  const classes = useStyles();
  const [reviewType, setReviewType] = React.useState("");
  const [formType, setFormType] = React.useState(-1);
  const [facility, setFacility] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [audit, setAudit] = React.useState("");
  const [reviewLevel, setReviewLevel] = React.useState(0);
  const [startDate, setStartDate] = React.useState(0);
  const [endDate, setEndDate] = React.useState(0);
  const [auditTeam, setAuditTeam] = React.useState("");
  const [auditCompany, setAuditCompany] = React.useState("");
  const [auditor, setAuditor] = React.useState("");
  const [sections, setSections] = React.useState([]);
  const [score, setScore] = React.useState("");
  const [result, setResult] = React.useState("");
  const [coverageDays, setCoverageDays] = React.useState(0);
  const [notificationDays, setNotificationDays] = React.useState(0);
  const [sectionData, setSectionData] = React.useState({});

  const [inspections, setInspections] = React.useState([]);
  const inspectionForms = JSON.parse(localStorage.getItem("inspectionForms"));
  const facilitiesData = JSON.parse(localStorage.getItem("facilitiesData"));

  const handleChangeCoverageDays = (event) => {
    setCoverageDays(event.target.value);
  };
  const handleNotificationDaysChange = (event) => {
    setNotificationDays(event.target.value);
  };
  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };
  const handleResultChange = (event) => {
    setResult(event.target.value);
  };
  const handleChangeReviewType = (event) => {
    setReviewType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleChangeAuditor = (event) => {
    setAuditor(event.target.value);
  };

  const handleChangeAuditCompany = (event) => {
    setAuditCompany(event.target.value);
  };
  const handleChangeAuditTeam = (event) => {
    setAuditTeam(event.target.value);
  };

  const handleChangeFormType = (event) => {
    setFormType(event.target.value);
    const formSectionsData = JSON.parse(
      JSON.stringify(inspectionForms[event.target.value].sections)
    );
    console.log("formSectionsData", formSectionsData);
    setSections(formSectionsData);
  };

  const handleChangeForm = (section, questionId, key, value) => {
    console.log("data....", section, questionId, key, value);
    const sectionsClone = JSON.parse(JSON.stringify(sections));
    sectionsClone[section].questions[questionId].questionData[key] = value;
    setSections(sectionsClone);
    console.log(sectionsClone);
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

  const handleChangeReviewLevel = (event) => {
    setReviewLevel(event.target.value);
  };

  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setReviewType("");
    setFormType(-1);
    setFacility("");
    setCompany("");
    setAudit("");
    setReviewLevel(0);
    setStartDate(0);
    setEndDate(0);
    setAuditTeam("");
    setAuditor("");
    setAuditCompany("");
    setScore("");
    setResult("");
    setNotificationDays("");
    setCoverageDays("");
    setSectionData("");
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
      "https://9z3k7jzo2i.execute-api.us-west-2.amazonaws.com/prod/audits?company=" +
        user,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setInspections(data);
        localStorage.setItem("inspections", JSON.stringify(data));
      });
  }, []);

  return (
    <Grid container>
      <MenuComponent />
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
                  value={reviewType}
                  onChange={handleChangeReviewType}
                >
                  <MenuItem value="inspection">Inspection</MenuItem>
                  <MenuItem value="audit">Audit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Form type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formType}
                  onChange={handleChangeFormType}
                >
                  {inspectionForms.map((form, index) => (
                    <MenuItem value={index}>{form.formName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Facility</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={facilitiesData
                    .map((f) => f.facilityName)
                    .indexOf(facility)}
                  onChange={handleChangeFacility}
                >
                  {facilitiesData.map((facility, index) => (
                    <MenuItem value={index}>{facility.facilityName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={company}
                className={classes.formControl}
                label="Company Name"
                onChange={handleChangeCompany}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={audit}
                className={classes.formControl}
                id="audit-name"
                name="audit-name"
                label="Inspection/Audit name"
                autoComplete="audit-name"
                onChange={handleChangeAudit}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={auditor}
                className={classes.formControl}
                label="Lead Inspector/Auditor Name"
                onChange={handleChangeAuditor}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={auditCompany}
                className={classes.formControl}
                label="Lead Inspector/Auditor Company"
                onChange={handleChangeAuditCompany}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={auditTeam}
                className={classes.formControl}
                id="audit-name"
                name="audit-name"
                label="Inspection/Audit Team"
                autoComplete="audit-name"
                onChange={handleChangeAuditTeam}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Review Level
                </InputLabel>
                <Select
                  value={reviewLevel}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChangeReviewLevel}
                >
                  <MenuItem value={3}>Internal</MenuItem>
                  <MenuItem value={4}>External</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <br />
            <br />
            <Grid item md={12}>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <FormControlLabel
                control={
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(event) => handleStartDateChange(event)}
                  />
                }
                label="Start Date"
              />
            </Grid>
            {formType !== -1 && (
              <FormComponent
                form={inspectionForms[formType]}
                handleChangeForm={handleChangeForm}
              />
            )}
            <br />
            <br />
            <Grid item md={12}>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <FormControlLabel
                control={
                  <Input
                    value={endDate}
                    type="date"
                    onChange={(event) => handleEndDateChange(event)}
                  />
                }
                label="Completion Date"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                placeholder=""
                value={score}
                className={classes.formControl}
                id="audit-name"
                name="audit-name"
                label="Score"
                autoComplete="audit-name"
                onChange={handleScoreChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Result</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={result}
                  id="demo-simple-select"
                  onChange={handleResultChange}
                >
                  <MenuItem value="pass">Pass</MenuItem>
                  <MenuItem value="fail">Fail</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={coverageDays}
                placeholder=""
                className={classes.formControl}
                label="Coverage Days"
                onChange={handleChangeCoverageDays}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                value={notificationDays}
                placeholder=""
                className={classes.formControl}
                label="Expiration Notification Days"
                onChange={handleNotificationDaysChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (
                reviewType === "" ||
                facility === "" ||
                company === "" ||
                audit === "" ||
                formType === -1 ||
                reviewLevel === 0 ||
                startDate === 0 ||
                endDate === 0 ||
                auditTeam === "" ||
                auditCompany === "" ||
                auditor === "" ||
                score === "" ||
                result === "" ||
                coverageDays === 0 ||
                notificationDays === 0
              ) {
                alert("Please fill all required fields");
                return;
              }
              const formData = {};
              formData["reviewType"] = reviewType;
              formData["facility"] = facilitiesData[facility].facilityName;
              formData["company"] = company;
              formData["entity_name"] = user;
              formData["audit_id"] = Number.parseInt(
                Math.random() * 100000
              ).toString();
              formData["auditName"] = audit;
              formData["formType"] = inspectionForms[formType].formName;
              formData["reviewLevel"] = reviewLevel;
              formData["startDate"] = startDate;
              formData["endDate"] = endDate;
              formData["auditTeam"] = auditTeam;
              formData["auditCompany"] = auditCompany;
              formData["auditor"] = auditor;
              formData["sections"] = sections;
              formData["score"] = score;
              formData["result"] = result;
              formData["coverageDays"] = coverageDays;
              formData["notificationDays"] = notificationDays;

              console.log(formData);

              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              };
              fetch(
                "https://9z3k7jzo2i.execute-api.us-west-2.amazonaws.com/prod/audits",
                requestOptions
              )
                .then((response) => response.json())
                .then((data) => {});

              setInspections([...inspections, formData]);
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
          New Site Inspection
        </Typography>
        <Box p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenForm}
          >
            New Inspection
          </Button>
        </Box>
      </Grid>
      <Grid item md={12}>
        <Typography variant="h6" align="center" component="h6">
          Inspections
        </Typography>
      </Grid>
      <Grid item md={12}>
        <div className="ag-theme-alpine grid-main">
          <AgGridReact
            rowData={inspections}
            rowSelection="single"
            onRowClicked={(event) => {
              const rowData = event.api.getSelectedRows()[0];

              // formData["reviewType"] = reviewType;
              // formData["facility"] = facilitiesData[facility].facilityName;
              // formData["company"] = company;
              // formData["entity_name"] = user;
              // formData["audit_id"] = Number.parseInt(
              //   Math.random() * 100000
              // ).toString();
              // formData["auditName"] = audit;
              // formData["formType"] = inspectionForms[formType].formName;
              // formData["reviewLevel"] = reviewLevel;
              // formData["startDate"] = startDate;
              // formData["endDate"] = endDate;
              // formData["auditTeam"] = auditTeam;
              // formData["auditCompany"] = auditCompany;
              // formData["auditor"] = auditor;
              // formData["sections"] = sections;
              // formData["score"] = score;
              // formData["result"] = result;
              // formData["coverageDays"] = coverageDays;
              // formData["notificationDays"] = notificationDays;

              console.log(rowData);
              setReviewType(rowData.reviewType);
              setFormType(
                inspectionForms.map((f) => f.formName).indexOf(rowData.formType)
              );
              setFacility(rowData.facility);
              setCompany(rowData.company);
              setAudit(rowData.audit);
              setReviewLevel(rowData.reviewLevel);
              setStartDate(rowData.startDate);
              setEndDate(rowData.endDate);
              setAuditTeam(rowData.auditTeam);
              setAuditor(rowData.auditor);
              setAuditCompany(rowData.auditCompany);
              setScore(rowData.score);
              setResult(rowData.result);
              setNotificationDays(rowData.notificationDays);
              setCoverageDays(rowData.coverageDays);
              setSectionData(rowData.sections);

              setOpenForm(true);
            }}
          >
            <AgGridColumn
              field="facility"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="company"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="auditName"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="formType"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="reviewLevel"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="startDate"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="endDate"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="auditTeam"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="auditCompany"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="auditor"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            {/* <AgGridColumn
              field="sections"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn> */}
            <AgGridColumn
              field="score"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="result"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="coverageDays"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="notificationDays"
              sortable={true}
              filter={true}
              resizable
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </Grid>
    </Grid>
  );
};
export default InspectionComponent;
