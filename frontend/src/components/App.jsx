import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Layout from './Layout';
import RootFolder from './folder/RootFolder';
import ChatFolder from './folder/ChatFolder';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route exact path="/root" component={ RootFolder } />
                        <Route exact path="/root/:id" component={ RootFolder } />
                        <Route exact path="/chat" component={ ChatFolder } />
                    </Switch>
                </Layout>
            </div>
        );
    }
}
export default AppComponent;
