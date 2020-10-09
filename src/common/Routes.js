import LandingPageComponent from "components/LandingPageComponent/index";
import LoginComponent from "components/LoginComponent/index";
import TermsComponent from "components/TermsComponent/index";

const Routes = {
  LANDING: { path: "/", protected: false, component: LandingPageComponent },
  LOGIN: { path: "/login", protected: false, component: LoginComponent },
  TERMS: { path: "/terms", protected: false, component: TermsComponent },
};

export default Routes;
