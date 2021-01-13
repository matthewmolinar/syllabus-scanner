import React, { useEffect } from "react";
// @material-ui/core
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {CircularProgress, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import {CalendarToday, Save} from '@material-ui/icons';
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomModal from 'components/CustomModal/CustomModal.js';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import UploadArea from 'components/UploadArea/UploadArea';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
var download = require("downloadjs");



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
  // This was named cardclass, but now it handles a lot of things.
  const cardclass = newStyles();
  const [open, setOpen] = React.useState(false)
  const [classNum, setClassNum] = React.useState(1);
  const [loadout, setLoadout] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const calendarify = (e) => {
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
        download(new Blob([res.data.calendar]), 'calender.ics');
        setLoadout(true); // This shows the loadout, which is a more simple approach. However, this 
        // might not be the way you wish to go, if you want to download as soon as the cal comes
        // back, you'll need to initiate an event of some type that downloads the file that returned
        // on the client's computer.

        //IF you want to go the simple route, this is what you'd do
        document.getElementById('loadout').href = res.calendar;
      })
      .catch(err => console.log(err.data));
    // It's important to handleClose() HERE, as opposed to onClick with the Generate button.
    // If you close the modal onClick with the button, there will be no form for axios to send.
  };

  const handleOpen = () => {
    setOpen(true);
    console.log('opened')
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const loadingHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose()}, 500);
    calendarify(e);
  }

 
// Don't use this!!!!!**************
  // const uploadFileS3 = (e) => {
  //   e.preventDefault();
  //   for (let i = 1; i < classNum + 1; i++) {
  //     let file = document.querySelector(`#file-${i}`)
  //     file = file.files[0]
  //     // this is basically sending each file and doing the process
  //     // on each file. Don't do this at home kids. Use AWS Lambda functions.


  //     
  //     getSignedRequest(file)
  //   }
  // };

  

  // only takes one file.
  // const getSignedRequest = file => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
  //   xhr.onreadystatechange = () => {
  //     if(xhr.readyState === 4){
  //       if(xhr.status === 200){
  //         const response = JSON.parse(xhr.responseText);
  //         postRequestS3(file, response.data, response.url);
  //       }
  //       else{
  //         alert("Could not get signed URL. Please contact novelicatechnologies.gmail.com with this error.")
  //       }
  //     }
  //   };
  //   xhr.send();
  // }

  // const postRequestS3 = (file, s3Data, url) => {
  //   var postData = new FormData();
  //   for(let key in s3Data.fields){
  //     postData.append(key, s3Data.fields[key]);
  //   }
  //   postData.append('file', file);
    
  //   axios.post(s3Data.url, postData)
  //   .then( () => {
  //     document.getElementById("preview").href = url;
  //     setLoadout(true);
  //     handleClose()
  //   })
  //   .catch(error => {
  //     console.log(error.response)
  //   })
  // }

  
  

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
                  <form id="files_input">
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
                    <Button 
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={loadingHandler}
                    >
                      {loading && <CircularProgress size={14} />}
                      {!loading && 'Generate Calendar'}
                      </Button>
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
                id="loadout"
                href="/"
                >Download Calendar</Button>}
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
