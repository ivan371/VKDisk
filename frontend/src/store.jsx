import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from './middlewares/logger';
import initReducers from './reducers';

export default function initStore() {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        composeWithDevTools(applyMiddleware(apiMiddleware, logger)),
    );
}
