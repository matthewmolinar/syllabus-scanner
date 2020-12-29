import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { makeStyles } from "@material-dash/core/styles";
import AppBar from "@material-dash/core/AppBar";
import Toolbar from "@material-dash/core/Toolbar";
import IconButton from "@material-dash/core/IconButton";
import Hidden from "@material-dash/core/Hidden";

import Menu from "@material-dash/icons/Menu";

import StudentNavbarLinks from './StudentNavbarLinks.js';
import Button from 'components/CustomButtons/StudentButton.js'

import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';

const useStyles = makeStyles(styles);

export default function StudentNavbar(props) {
    const classes = useStyles();
    
    const { color } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });
    return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <StudentNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
    );
}

StudentNavbar.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    handleDrawerToggle: PropTypes.func,
};