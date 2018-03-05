import createHistory from 'history/createBrowserHistory';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import initStore from './store';
import App from './components/App';

import '../static/css/base.scss';

const history = createHistory();
const middleware = routerMiddleware(history);


ReactDOM.render(
    <Provider store={ initStore([middleware]) }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
