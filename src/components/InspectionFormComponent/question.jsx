import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const QuestionComponent = (props) => {
  const classes = useStyles();
  const [questionType, setQuestionType] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [questionData, setQuestionData] = React.useState({});

  const handleChangeQuestionType = (event) => {
    setQuestionType(event.target.value);
    questionData["questionType"] = event.target.value;
    setQuestionData(questionData);
    props.getQuestionsData(props.uniqueKey, questionData);
  };

  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
    questionData["question"] = event.target.value;
    setQuestionData(questionData);
    props.getQuestionsData(props.uniqueKey, questionData);
  };

  return (
    <Grid container item xs={12} spacing={1}>
      <Grid item xs={6} sm={6}>
        <TextField
          id="question"
          name="question"
          label="Question"
          fullWidth
          value={question}
          onChange={handleChangeQuestion}
        />
      </Grid>
      {/* <Grid item xs={6} sm={6}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Question type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={questionType}
            onChange={handleChangeQuestionType}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
    </Grid>
  );
};

export default QuestionComponent;
