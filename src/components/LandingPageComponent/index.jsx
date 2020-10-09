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
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const LandingPageComponent = (props) => {
  const history = useHistory();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [facilitiesData, setFacilitiesData] = useState([
    { reviewType: "Type1", formType: "Celica", inspetionName: "Name1" },
    { reviewType: "Type2", formType: "Mondeo", inspetionName: "Name2" },
    { reviewType: "Type3", formType: "Boxter", inspetionName: "Name3" },
  ]);

  return (
    <Grid container>
      <Grid item md={12}>
        <Box p={2}>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Add Facility
          </Button>
        </Box>
      </Grid>
      <Grid item md={12}>
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
              field="leadInspectorCompany"
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
  );
};
export default LandingPageComponent;
