import createHistory from 'history/createBrowserHistory';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import initStore from './store';

const history = createHistory();
const middleware = routerMiddleware(history);


ReactDOM.render(
    <Provider store={ initStore([middleware]) }>
        <ConnectedRouter history={ history }>
            <div>Hello, world</div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
