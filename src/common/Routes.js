import LandingPageComponent from "components/LandingPageComponent/index";
import LoginComponent from "components/LoginComponent/index";
import TermsComponent from "components/TermsComponent/index";
import InspectionFormComponent from "components/InspectionFormComponent/index";

const Routes = {
  LANDING: { path: "/", protected: false, component: LandingPageComponent },
  INSPECTION: {
    path: "/inspection",
    protected: false,
    component: InspectionFormComponent,
  },
  LOGIN: { path: "/login", protected: false, component: LoginComponent },
  TERMS: { path: "/terms", protected: false, component: TermsComponent },
};

export default Routes;
