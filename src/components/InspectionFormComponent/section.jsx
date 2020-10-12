import React, { useEffect, useState } from "react";
import { Grid, Button, Paper } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import TextField from "@material-ui/core/TextField";
import QuestionComponent from "./question";

const SectionComponent = (props) => {
  const [sectionName, setSectionName] = useState("");
  const [questions, setQuestions] = React.useState([]);
  const [questionData, setQuestionData] = React.useState({});

  const handleChangeSectionName = (event) => {
    setSectionName(event.target.value);
    props.getSectionData(props.uniqueKey, event.target.value, questionData);
  };

  const getQuestionData = (key, data) => {
    questionData[key] = {
      questionData: data,
    };
    setQuestionData(questionData);
  };

  return (
    <div key={props.uniqueKey}>
      <Paper elevation={3} style={{ padding: 10 }} key={props.uniqueKey}>
        <Grid container item xs={12} md={12} spacing={1}>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="section-name"
              name="section-name"
              label="Section name"
              value={sectionName}
              fullWidth
              onChange={handleChangeSectionName}
            />
          </Grid>
          <Grid item container xs={6} sm={6}>
            <Grid item xs={6} sm={6}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  setQuestions([
                    ...questions,
                    <QuestionComponent
                      uniqueKey={Date.now()}
                      getQuestionsData={getQuestionData}
                    />,
                  ]);
                }}
              >
                Add Question
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  const question = questions.pop();
                  delete questionData[question.props.uniqueKey];
                  setQuestionData(questionData);
                  setQuestions([...questions]);
                }}
              >
                Remove Question
              </Button>
            </Grid>
          </Grid>

          {questions.map((section) => {
            return section;
          })}
        </Grid>
      </Paper>
      <br />
    </div>
  );
};

export default SectionComponent;
