import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/matthew.jpg";
import team2 from "assets/img/faces/caleb.jpeg";
import team3 from "assets/img/faces/logan.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Only The Best Can Develop For The Best.</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Matthew Molinar
                <br />
                <small className={classes.smallTitle}>Co-founder</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                Originally from Atascocita, Texas, Matthew studied at Lone Star College-Kingwood, 
                then transferred to the University of Texas at Austin, 
                studying Mechanical Engineering and Computer Science. 
                He has experience working with full-stack web development, 
                algorithms and numerical methods development, design methodologies, and mechatronics.
                </p>
                <p className={classes.description}>
                Matthew decided to follow in his father’s entrepreneurial footsteps after his father was 
                diagnosed with Alzheimer’s disease. Matthew is deeply concerned about the impact of 
                neurological diseases and has an interest in how technology can provide lifestyle changes, 
                efficiency, and self-care in hopes of a long-term deterrence of cognitive decline.
                 Students and employees are burdened by too much stress, 
                 and Matthew's mission is to change this, so that we can all live a better life.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/molinar1999"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.instagram.com/matthew.a.molinar/"
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.linkedin.com/in/matthewmolinar/"
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Caleb Ford
                <br />
                <small className={classes.smallTitle}>Co-founder</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                Originally from Houston, Caleb is a junior at the University of Texas at Austin studying Mathematics, Computer Science, and Economics. With technical experience in full-stack web development (React, Flask) and data analytics, Caleb believes in the power of technology to help improve our daily lives. Currently, that belief is expressed through building the products that students need to improve their academic experience. 
                </p>
                <p className={classes.description}>
                Caleb also has a deep interest in how data-driven technologies can help improve the public policy making process. Working as an intern for Texas Rep. James Talarico has given him the policy experience required to further pursue the fusion of data and policy design. 
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/cmf3673"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.instagram.com/caleb.witha.k/"
                  >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.linkedin.com/in/caleb-f-b36819111/"
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Logan Ankenbrandt
                <br />
                <small className={classes.smallTitle}>Co-founder</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Logan is a Full-Stack Web Developer with a strong grasp of frameworks such as React, Flask, FastAPI, and other internet application foundations as well as experience in mobile application development. Despite his love of developing software, Logan also enjoys the strategic approach for developing products - this includes user acquisition, user testing, and the most important element in the growth of a startup: talking to the user. 
                </p>
                <p className={classes.description}>
                Originally from Kingwood, Texas, Logan started his higher education in the Honors College at Lone Star College Kingwood - finishing with an Associates of Arts. He is now a Junior at Sam Houston State University studying Computer Science.

                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/logananks"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://twitter.com/l_anks?lang=en"
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.linkedin.com/in/logan-ankenbrandt-3b053a169/"
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
