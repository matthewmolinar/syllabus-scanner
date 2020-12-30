import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import Textsms from '@material-ui/icons/Textsms';

import GraphicEq from '@material-ui/icons/GraphicEq.js'
import Eco from '@material-ui/icons/Eco.js';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>You don't know what you don't know.</h2>
          <h5 className={classes.description}>
          Traditional education software is built for administrators - not students. 
          We strive to correct this trend, for in this newly-minted digital transition that was expedited by the COVID-19 pandemic,
          students are faced with new demands to continue their academic success, 
          and this means new tools to assist in their academic endeavors, and here’s how we plan to do it:

          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Student-centric"
              description="We plan to build our software with a student-first philosophy. 
              By having direct contact with our student users, we plan to leverage the feedback 
              we get from these users to cater to the specific needs presented by students 
              in the form of new and innovative software solutions."
              icon={Textsms}
              iconColor="info"
              vertical
            />
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="With Great Power..."
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
              icon={Eco}
              iconColor="success"
              vertical
            />
          </GridItem> */}
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Cutting Edge"
              description="The traditional education software has stagnated in technological development since their founding,
               and this is for one simple reason: their market dominance has disincentivized the product 
               improvement process to give students what they need to succeed. 
               Novelica aspires to counter this trend by directly connecting our success with the success of students."
              icon={GraphicEq}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
