import React from 'react';
import Layout from './Layout';
import {Route, Switch} from 'react-router';
import RootFolder from './folder/RootFolder';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Layout/>
                <Switch>
                    <Route exact path="/root" component={RootFolder}/>
                </Switch>
            </div>
        )
    }
}
export default AppComponent;