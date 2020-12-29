import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import LandingHeaderLinks from "components/Header/LandingHeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Alert from 'components/Alert/Alert';
import {LoginHandler, isLoggedIn} from '../../components/LoginHandler/LoginHandler';


import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/landing7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [err, setErr] = React.useState('');
  const [loginStatus] = React.useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  useEffect(() => {
    isLoggedIn().then(r => {if (r) {
      window.location = "/student"
      }
    });
  }, []);

  const login = (e) => {
    e.preventDefault();
    LoginHandler(document.getElementById("email").value,
        document.getElementById("password").value).then(r => {
        if (r === true) {
            window.location = "/student"
        } else {
            setErr(r);
        }
    })
  };
  return (
    <div>
      <Header
        absolute
        color="white"
        brand="Novelica for Students"
        rightLinks={<LandingHeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={login}>
                  <CardHeader color="danger" className={classes.cardHeader}>
                    <h4>Login</h4>
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <p className={classes.divider}>Please sign in before using Novelica.</p>
                  <CardBody>
                    {err.length > 0 && (
                        <Alert 
                          message={`Check your form and try again! (${err})`}
                        />
                      )}
                    {/* <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> */}
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <GridContainer className={classes.divider}>
                    <GridItem>
                      {loginStatus && <p>You're logged in!</p>}
                    </GridItem>
                  </GridContainer>
                  <CardFooter className={classes.cardFooter}>
                  <Button type="submit" simple color="info" size="lg">
                      Log In
                    </Button>
                    <Button type="submit" simple color="info" size="lg" href="/signup-page">
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
