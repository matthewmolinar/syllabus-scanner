import React from "react";
// import useState from 'react';

// @material-ui/core
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-dash/core/styles";
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';



// @material-ui/icons
import {Save} from '@material-ui/icons';
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


export default function StudentDashboard() {
  const classes = useStyles();
  const cardclass = newStyles();
  const [open, setOpen] = React.useState(false)
  const [classNum, setClassNum] = React.useState(1);
  const [loadout, setLoadout] = React.useState(false);
  const [file, setFile] = React.useState();

  const uploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // You need to figure out how to select however many files there are.
    // Idea:
    // access the state...
    // query select those file-(#)
    // How do you send multiple files at once?
    for (let i = 1; i < classNum + 1; i++) {
      let file = document.querySelector(`#file-${i}`)
      formData.append("file", file.files[0])
    }
    console.log(formData);
    axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data));
    handleClose()


  };


  const handleOpen = () => {
    setOpen(true);
    console.log('opened')
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerate = () => {
    setOpen(false);
    setLoadout(true);
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
                  <form onSubmit={uploadFile}>
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
                    {/* Make a component that will resize based on number */}
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
            {/* <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader> */}
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
      {/* <GridContainer spacing ={0} justify="center">
        <GridItem xs={3} sm={3} md={3}>
          <Card> */}
            {/* <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader> */}
            {/* <CardBody>
            <h4 className={classes.cardTitle}>Current Syllabi Calendar Loadout</h4>
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
        
      </GridContainer> */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="info"
            tabs={[
              {
                tabName: "Homework",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={homework}
                  />
                )
              },
              {
                tabName: "Quizzes",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={quizzes}
                  />
                )
              },
              {
                tabName: "Exams",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={exams}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Previous Syllabi Calendar Loadouts</h4>
              <p className={classes.cardCategoryWhite}>
                You've created 4 loadouts.
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Classes", "Type"]}
                tableData={[
                  ["1", "Custom Name 1", "4", ".file"],
                  ["2", "Custom Name 2", "2", ".file"],
                  ["3", "Custom Name 3", "5", ".file"],
                  ["4", "Custom Name 4", "3", ".file"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
