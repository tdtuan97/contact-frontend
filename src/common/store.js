import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import historyCommon from './historyCommon';
import rootReducer from './rootReducer';

const router = routerMiddleware(historyCommon);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [thunk, router];

let devToolsExtension = f => f;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
    const {createLogger} = require('redux-logger');

    const logger = createLogger({
        collapsed: true,
    });
    //middlewares.push(logger);

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
    }
}

function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
        ),
    );

    return store
}

export default configureStore();
