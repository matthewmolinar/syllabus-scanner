import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from '@material-ui/core'
  import PropTypes from 'prop-types'

  export default function CustomDialog(
    handleClose,
    title,
    subtitle,
    children
  ) {
    const [isOpen] = React.useState(false)
    return (
      <>
        <Dialog
          fullWidth
          maxWidth='sm'
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='max-width-dialog-title'
        >
          <DialogTitle id='max-width-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{subtitle}</DialogContentText>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  CustomDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.element.isRequired
  }