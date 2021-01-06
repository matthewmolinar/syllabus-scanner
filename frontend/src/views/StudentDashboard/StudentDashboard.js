import React, { useEffect } from "react";
// @material-ui/core
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-dash/core/styles";
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import {CalendarToday, Save} from '@material-ui/icons';
import AccessTime from "@material-dash/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Danger from 'components/Typography/Danger.js';
import CustomDialog from 'components/CustomDialog/CustomDialog.js';
import CustomModal from 'components/CustomModal/CustomModal.js';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import UploadArea from 'components/UploadArea/UploadArea';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage";
import axios from "axios";

const useStyles = makeStyles(styles);
const newStyles = makeStyles({
  card: {
    width: "auto",
    height: "200px",
    margin: "auto"
  },
  button: {
    padding: '5px 30px',
    margin: '2em auto 2em'
  },
  loadout:
  {
    width: "auto",
    height: "200px",
    margin: "auto",
  },
  carousel: {
    width: "auto",
    height: "auto",
    margin: "6em auto 3em"
    },
  modal: {
    width: '350px',
    height: '600px',
    margin: 'auto'
  },
  modalClose: {
    margin: 'auto'
  }
})

export default function StudentDashboard(props) {
  const classes = useStyles();
  // This was named cardclass, but now it handles a lot of things that I built myself.
  const cardclass = newStyles();
  const [open, setOpen] = React.useState(false)
  const [classNum, setClassNum] = React.useState(1);
  const [loadout, setLoadout] = React.useState(false);
  const [file, setFile] = React.useState();

  const uploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // This sends every file that has been uploaded.
    for (let i = 1; i < classNum + 1; i++) {
      let file = document.querySelector(`#file-${i}`)
      formData.append("file", file.files[0])
    }
    axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      )
      .then(res => {
        console.log(res.data);
        // Simulating an ics file coming back.
        setLoadout(true);
      })
      .catch(err => console.log(err.data));
    // It's important to handleClose() HERE, as opposed to onClick with the Generate button.
    // If you close the modal onClick with the button, there will be no form for axios to send.
    handleClose()
  };

  const handleOpen = () => {
    setOpen(true);
    console.log('opened')
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  // This is used to detect changes in the input from <UploadArea />
  // Under Construction. Not sure if needed at the moment. 

  // Maybe run a getSignedRequest on each file submitted.
  const uploadFileS3 = (e) => {
    e.preventDefault();
    for (let i = 1; i < classNum + 1; i++) {
      let file = document.querySelector(`#file-${i}`)
      file = file.files[0]
      // this is basically sending each file and doing the process
      // on each file. Don't do this at home kids. Use AWS Lambda functions.


      // calendarify(file.name)
      getSignedRequest(file)
    }
  };

  const calendarify = (filename) => {
    const formData = new FormData();
    formData.append("file_name", filename)
    axios
      .post("/api/pdf", formData)
      .then(res => {
        // This needs to be configured to target the download button.
        document.getElementById("").value = res.calendar
      })
  }

  // only takes one file.
  const getSignedRequest = file => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          postRequestS3(file, response.data, response.url);
        }
        else{
          alert("Could not get signed URL. Please contact novelicatechnologies.gmail.com with this error.")
        }
      }
    };
    xhr.send();
  }

  const postRequestS3 = (file, s3Data, url) => {
    var postData = new FormData();
    for(let key in s3Data.fields){
      postData.append(key, s3Data.fields[key]);
    }
    postData.append('file', file);
    
    axios.post(s3Data.url, postData)
    .then( () => {
      document.getElementById("preview").href = url;
      setLoadout(true);
      handleClose()
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  
  

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={6} sm={6} md={6} spacing={1}>
          <Card className={cardclass.card}>
            <CardBody>
              <h4 className={classes.cardTitle}>Novelica Loadout Generator</h4>
              <div className={classes.cardCategory}>
              <CustomModal 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose} 
                handleOpen={handleOpen}
                id="modal"
              >
                <Card className={cardclass.modal}>
                  <form onSubmit={uploadFileS3} id="files_input">
                  <CardBody>
                    <h4 className={classes.cardtitle}>How many classes are you taking?</h4>
                    <CustomDropdown
                      dropdownHeader="Taking more classes? Let us know."
                      buttonText='Number of Classes'
                      dropdownList={[
                        1,2,3,4,5,6,7
                      ]}
                      onClick={(dropdownItem) => {setClassNum(dropdownItem)}}
                    >
                    </CustomDropdown>
                    {/* UploadArea component resizes based on state of StudentDashboard. */}
                    <UploadArea 
                    numberOfClasses={classNum}
                    />
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" variant="contained" color="secondary">Generate Calendar</Button>
                    <Button type="button" onClick={handleClose} className={cardclass.modalClose}>Close</Button>
                  </CardFooter>
                  </form>
                </Card>
              </CustomModal>  
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={6} spacing={1}>
          <Card className={cardclass.loadout}>
            <CardBody>
            <h4 className={classes.cardTitle}>Current Novelica Loadout</h4>
              <p className={classes.cardCategory}>
                {!loadout && 'Nothing Here!'}
                {loadout && <Button 
                variant="contained"
                color="secondary"
                type="button"
                >Download Calendar</Button>}
              </p>
              <a id="preview" href=""> See current syllabi. </a>
              
            </CardBody>
            <CardFooter >
              <div className={classes.stats}>
                <AccessTime /> updated just now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer spacing={0} justify="center">
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} spacing={0}>
            <Card className={cardclass.carousel}>
              <CardBody>
                <h4 className={classes.cardtitle}>Previous Novelica Loadout</h4>
                <p className={classes.cardCategory}>
                Nothing Here!
              </p>
              </CardBody>
              <CardFooter >
              <div className={classes.stats}>
                <AccessTime /> updated just now
              </div>
            </CardFooter>
            </Card>

        </GridItem>
      </GridContainer>
    </div>
  );
}
