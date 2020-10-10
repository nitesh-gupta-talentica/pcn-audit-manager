import React, { useState, useEffect } from "react";
import { Grid, Button, Paper } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import QuestionComponent from "./question";

const SectionComponent = (props) => {
  const [sectionName, setSectionName] = useState("");

  const handleChangeSectionName = (event) => {
    setSectionName(event.target.value);
  };

  return (
    <Paper elevation={3} style={{ padding: 10 }}>
      <Grid container item xs={12} spacing={1}>
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
            <Button item variant="contained" color="primary" onClick={() => {}}>
              Add Question
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button item variant="contained" color="primary" onClick={() => {}}>
              Remove Question
            </Button>
          </Grid>
        </Grid>
        <QuestionComponent />
      </Grid>
    </Paper>
  );
};

export default SectionComponent;
