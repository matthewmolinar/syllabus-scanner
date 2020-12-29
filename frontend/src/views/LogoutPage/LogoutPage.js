import React from 'react';
import {logout} from 'components/LoginHandler/LoginHandler.js';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

class LogoutPage extends React.Component {
    componentDidMount() {
        logout()
    }
    render() {
        return (
            <GridContainer justify="cetner">
                <GridItem>
                    <h1>Logging you out...</h1>
                </GridItem>
            </GridContainer>
              
        )
    }
}

export default LogoutPage;