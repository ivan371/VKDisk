import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

ReactDOM.render(
    <Provider store={{}}>
        <ConnectedRouter history={{}}>
            <div>Hello, world</div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
