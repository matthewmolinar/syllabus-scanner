import React from "react";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Link from '@material-ui/core/Link';


// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Grid from '@material-ui/core/Grid';




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
import Checkbox from 'components/Checkbox/Checkbox';
import Alert from 'components/Alert/Alert';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function SignupPage(props) {
  const [err, setErr] = React.useState('');
  const [registration] = React.useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const register = (e) => {
    e.preventDefault();
    axios
        .post("/api/register", {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value
        })
        .then((res) => {
            if (res.data.error) {
              console.log(typeof password)
              console.log(typeof email)
              setErr(res.data.error);
            } else {
              window.location = '/login-page'
            }
        });
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
                <form className={classes.form} onSubmit={register}>
                  <CardHeader color="danger" className={classes.cardHeader}>
                  {/* <People /> */}
                  <h4>Sign Up</h4> 
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
                  <p className={classes.divider}>Let's get you signed up.</p>
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
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <CustomInput
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstname"
                          labelText="First Name"
                          autoFocus
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomInput
                          variant="outlined"
                          required
                          fullWidth
                          id="lastname"
                          labelText="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </Grid>
                    </Grid>
                    
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
                    <Grid item xs={12}>
                      <Checkbox />
                     </Grid>
                  </CardBody>
                  <GridContainer className={classes.divider}>
                      <GridItem>
                        {registration && <p>You're signed up!</p>}
                      </GridItem>
                  </GridContainer>
                  <CardFooter className={classes.cardFooter}>
                      <Button type="submit" justify="center" simple color="info" size="lg">
                        Get started
                      </Button>
                  </CardFooter>
                  <GridItem container>
                    <Link justify="center"href="/login-page">Already have an account? Sign in </Link>
                  </GridItem>
                  <CardFooter>
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
