import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Layout from './Layout';
import RootFolder from './folder/RootFolder';
import ChatFolder from './folder/ChatFolder';
import FolderFolder from './folder/FolderFolder';

export function scroll() {
    const d = document.getElementsByClassName('content-flex')[0];
    d.scrollTo(0, d.scrollHeight);
}

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route exact path="/root" component={ RootFolder } />
                        <Route exact path="/folder/:id" component={ FolderFolder } />
                        <Route exact path="/chat" component={ ChatFolder } />
                        <Route exact path="/chat/:id" component={ ChatFolder } />
                        <Route path="" component={ RootFolder } />
                    </Switch>
                </Layout>
            </div>
        );
    }
}
export default AppComponent;
