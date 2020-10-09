import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { transform } from "proj4";

const useStyles = makeStyles((theme) => ({
  tncContainer: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    background: theme.palette.common.white,
    padding: "3rem",
    borderRadius: "0.3rem",
    maxWidth: "39rem",
    width: "90%",
  },
  textField: {
    width: "calc(50% - 0.5rem)",
    "&:first-child": {
      marginRight: "1rem",
    },
  },
  heading: {
    fontSize: "1rem",
    fontWeight: "600",
    color: theme.palette.secondary.dark,
    paddingTop: "1.5rem",
  },
  subheading: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: theme.palette.secondary.dark,
    paddingTop: "1rem",
  },
  tncContaint: {
    paddingTop: "0.5rem",
    maxHeight: "calc(100vh - 18rem)",
    overflow: "auto",
    color: "#666666",
    fontSize: "0.875rem",
    "& p": {
      paddingBottom: "1rem",
    },
  },
  tcnBtn: {
    borderRadius: "5rem",
    minWidth: "15rem",
    fontWeight: "600",
  },
}));

const TermsComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const logData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestor_service: "PM",
        signer_email: email,
        company_name: company,
      }),
    };
    fetch(
      "https://1wg81f62r5.execute-api.us-west-2.amazonaws.com/prod/signers",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => history.push("/login"));
    history.push("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.tncContainer} boxShadow={5}>
        <form noValidate>
          <TextField
            className={classes.textField}
            id="email"
            label="Email"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            className={classes.textField}
            id="companyName"
            label="Company Name"
            variant="outlined"
            onChange={(event) => setCompany(event.target.value)}
          />
        </form>
        <Typography variant="h2" className={classes.heading}>
          Terms of Service
        </Typography>
        <Box className={classes.tncContaint}>
          <p style={{ textAlign: "center" }}>
            <strong>Confidential</strong>
          </p>
          <p style={{ textAlign: "center" }}>
            <strong>Non-Disclosure Agreement</strong>
          </p>
          <p>&nbsp;</p>
          <p>
            <span>
              This demonstration will expose the viewer to information which is
              the intellectual property and trade secrets of The Provenance
              Chain&trade; Network.&nbsp;
            </span>
          </p>
          <p>
            <span>
              By clicking &ldquo;I AGREE&rdquo; below and by viewing this
              demonstration, the above named individual/party agrees as follows:
            </span>
          </p>
          <ol>
            <li>
              <span>Obligation To Maintain Confidentiality.</span>
              <span>
                {" "}
                The party agrees that they shall not use for their own behalf
                and shall not disclose any information received during this
                demonstration to any other person, firm, or corporation and
                shall use the same degree of care to avoid disclosure of such
                information as the party employs with respect to their own
                proprietary information. The obligations to maintain the
                confidentiality of and to prevent the disclosure of such
                information shall extend to suppliers and employees of the party
                and said party shall be responsible under this Agreement for the
                conduct of their respective agents and employees.
              </span>
            </li>
            <li>
              <span>Termination.</span>
              <span>
                {" "}
                All obligations under this Agreement regarding the
                confidentiality and non-use of the proprietary information shall
                expire two (2) years from the date of this Agreement.&nbsp;
              </span>
            </li>
            <li>
              <span>Governing Law.</span>
              <span>
                {" "}
                Oregon laws shall govern all claims arising out of the
                disclosure and evaluation of such information, except where
                federal law preempts Oregon law. All claims concerning the
                disclosure and evaluation of such information shall be brought
                in Washington County Circuit Court, Washington County, Oregon
                or, if the claim gives rise to federal jurisdiction, in the
                United States District Court for the District of Oregon.
              </span>
            </li>
            <li>
              <span>Prior Agreements</span>
              <span>
                .&nbsp; This document is the entire, final and complete
                agreement of the parties, supersedes and replaces all written
                and oral confidentiality agreements heretofore made or existing
                by and between the parties or their representatives. This
                agreement shall not be modified except in writing signed by both
                parties.&nbsp;
              </span>
            </li>
            <li>
              <span>Remedies</span>
              <span>
                . If the party fails to abide by this Agreement, The PCN will be
                entitled to specific performance and injunctive relief, without
                bond, including immediate issuance of a temporary restraining
                order of preliminary injunction enforcing this Agreement, and to
                judgment for damages caused by the breach, and to any other
                remedies provided by applicable law.&nbsp;
              </span>
            </li>
            <li>
              <span>
                The effective date of this Agreement shall be the date the party
                has accepted this agreement and has viewed the demonstration.
              </span>
            </li>
          </ol>
          <p>
            <span>
              IN WITNESS WHEREOF the parties intending to be legally bound by
              this Agreement have hereunto set their signatures.
            </span>
          </p>
          <p>
            <span>
              I have read and accept the terms of this Non-disclosure agreement.
            </span>
          </p>
          <p>
            <br />
            <br />
          </p>
        </Box>
        <Box align="center" pt={"1.5rem"}>
          <Button
            variant="contained"
            color="primary"
            className={classes.tcnBtn}
            onClick={() => logData()}
          >
            I Accept
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TermsComponent;
