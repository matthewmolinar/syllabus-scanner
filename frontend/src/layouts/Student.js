// Student Layout
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// The scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

/// @material-ui/core components

import { makeStyles } from '@material-dash/core/styles';

// core components
import StudentNavbar from 'components/StudentNavbars/StudentNavbar.js';
import StudentFooter from 'components/StudentFooter/StudentFooter.js';
import StudentSidebar from 'components/StudentSidebar/StudentSidebar.js';

import routes from 'routes.js';

// import adminStyle
import styles from 'assets/jss/material-kit-react/layouts/adminStyle.js';

// import bgImage
import bgImage from 'assets/img/landing7.jpg';
// import Logo
import logo from 'assets/img/reactlogo.png';

// NOTES:
/* looks like we wont be needing FixedPlugin component.
    FixedPlugin  States:
        handleImageClick
            setImage
        handleColorClick:
            setColor
        handleFixedClick
            setFixedClasses
    
    looks like we WILL be needing the mobileOpen state, for various things.
    I think we will need handleDrawerToggle
    Eventually, we will need getRoute.
    resizeFunction seems to be used for the perfect-scrollbar plugin.
*/

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/student") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/student" to="/student/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Student({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <StudentSidebar
        routes={routes}
        logoText={"Novelica"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <StudentNavbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        
        <StudentFooter />
        
      </div>
    </div>
  );
}
