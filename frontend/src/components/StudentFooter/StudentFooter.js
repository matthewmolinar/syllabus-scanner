/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-dash/core/styles";
import ListItem from "@material-dash/core/ListItem";
import List from "@material-dash/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function StudentFooter(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:3000/" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:3000/" className={classes.block}>
                Aevellion, Inc.
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:3000/" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="http://localhost:3000/"
              target="_blank"
              className={classes.a}
            >
              Aevellion
            </a>
            , made with love for a better world
          </span>
        </p>
      </div>
    </footer>
  );
}
