import React from 'react';
import {Button} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-dash/core/styles";
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';


const theme = createMuiTheme({
    button: {
        margin: "100px"
    }
})

const useStyles = makeStyles({
    root: {
        margin: "10px"
    }
})

function ButtonStyled(props) {
    const classes = useStyles();
    return <Button className={classes.root} variant="contained" color="secondary" >Add Syllabus for Class {props.classNum}</Button>
}

export default class UploadArea extends React.Component{
    
    render() {
        
        let buttons = []
        let number = this.props.numberOfClasses;
        for (let i = 1; i < number + 1; i++) {
            buttons.push(
            <GridItem >
                <ButtonStyled classNum={i}/>
            </GridItem>
            )

        }
        return <GridContainer>
            {buttons}
        </GridContainer>
    }
}