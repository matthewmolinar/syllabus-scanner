import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from 'components/Card/Card.js';


import styles from 'assets/jss/material-kit-react/modalStyle.js';

const useStyles = makeStyles(styles)

export default function CustomModal(props) {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            <Button type="button" variant="contained" color="secondary" onClick={props.handleOpen}>
                Edit Loadout
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={props.handleClose}
            >
                <div className={classes.modalBody}>
                    {props.children}
                    {/* <Button onClick={handleClose}>Close</Button> */}
                </div>

            </Modal>

        </div>
    )
}