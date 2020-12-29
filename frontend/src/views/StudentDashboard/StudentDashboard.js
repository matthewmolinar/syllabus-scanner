import React from "react";
// react plugin for creating charts

// @material-ui/core
import { makeStyles } from "@material-dash/core/styles";
import Icon from "@material-dash/core/Icon";
// @material-ui/icons

import AccessTime from "@material-dash/icons/AccessTime";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";




import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function StudentDashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Syllabi Generator</p>
              <h3 className={classes.cardTitle}>
                UPLOAD
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
              
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
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
              <h4 className={classes.cardTitle}>Current Syllabi Calendar Loadout</h4>
              <p className={classes.cardCategory}>
                Nothing Here!
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated just now
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
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
