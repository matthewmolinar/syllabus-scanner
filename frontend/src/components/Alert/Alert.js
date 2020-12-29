import React from 'react';

function Alert(props) {
    return (
        <div className="alert alert-danger">
        <div className="container-fluid">
            <div className="alert-icon">
                <i className="material-icons">error_outline</i>
            </div>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i className="material-icons">clear</i></span>
            </button>
            <b>Error:</b> {props.message}
        </div>
        </div>
    )
}

export default Alert;