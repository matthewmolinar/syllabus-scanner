import React from 'react';
import {Button} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import CustomInput from 'components/CustomInput/CustomInput.js';


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

function UploadButton(props) {
    const classes = useStyles();
    return <Button
        variant="contained"
        component="label"
        color="secondary"
        className={classes.root}
        type="button"
        >
        Upload Syllabus for Class {props.classNum}
        <input 
            type="file"
            id={`file-${props.classNum}`}
            hidden
        />
    </Button>
}

function ButtonStyled(props) {
    const classes = useStyles();
    return <Button className={classes.root} variant="contained" color="secondary" component="label" >Add Syllabus for Class {props.classNum}</Button>
}

export default class UploadArea extends React.Component{
    
    render() {
        
        let buttons = []
        let number = this.props.numberOfClasses;
        for (let i = 1; i < number + 1; i++) {
            buttons.push(
                <UploadButton classNum={i}/>
            )

        }
        return <>
            {buttons}
        </>
    }
}