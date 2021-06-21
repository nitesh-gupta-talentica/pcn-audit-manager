import React, { useEffect, useState } from "react";
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
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const FormComponent = (props) => {
  const { form, handleChangeForm } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [value, setValue] = React.useState("yes");

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Divider />
      {form.sections.map((section, index) => (
        <Accordion
          expanded={expanded === "panel" + index}
          onChange={handleChange("panel" + index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              Section {index + 1}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {section.sectionName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {Object.keys(section.questions).map((questionNumber) => (
                <Grid item md={12}>
                  <br />
                  <br />
                  {section.questions[questionNumber].questionData.question}
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend"></FormLabel>
                        <RadioGroup
                          onChange={(event) =>
                            handleChangeForm(
                              index,
                              questionNumber,
                              "answer",
                              event.target.value
                            )
                          }
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                          <FormControlLabel
                            value="na"
                            control={<Radio />}
                            label="NA"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="checkedC"
                            onChange={(event) =>
                              handleChangeForm(
                                index,
                                questionNumber,
                                "docReview",
                                event.target.checked
                              )
                            }
                          />
                        }
                        label="Document Review"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="checkedC"
                            onChange={(event) =>
                              handleChangeForm(
                                index,
                                questionNumber,
                                "interviews",
                                event.target.checked
                              )
                            }
                          />
                        }
                        label="Interviews"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={<Input type="file" onChange={(event) => {}} />}
                        label=" Observations Confirming"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={<Input type="file" onChange={(event) => {}} />}
                        label=" Observations Refuting"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={<Input type="file" onChange={(event) => {}} />}
                        label="Minor Incidents"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={<Input type="file" onChange={(event) => {}} />}
                        label="Major Incidents"
                      />
                    </Grid>

                    <Grid item md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          COMMENTS
                        </InputLabel>
                        <Input
                          multiline
                          onChange={(event) =>
                            handleChangeForm(
                              index,
                              questionNumber,
                              "comments",
                              event.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Score
                        </InputLabel>
                        <Input
                          onChange={(event) =>
                            handleChangeForm(
                              index,
                              questionNumber,
                              "score",
                              event.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FormComponent;
