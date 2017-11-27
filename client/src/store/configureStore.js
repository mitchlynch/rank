import {createStore, compose, applyMiddleware} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const port = parseInt(window.location.search.replace('?', ''), 10) || 8000;
const socket = io(`http://localhost:${port}`);
const socketIoMiddleware = createSocketIoMiddleware(socket, "socketio/");

function configureStoreProd(initialState) {

    const middlewares = [
        // Add other middleware on this line...
        socketIoMiddleware,
        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk
    ];

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
        )
    );

    store.subscribe(() => {
        console.log('new client state', store.getState());
    });

    return store;
}

function configureStoreDev(initialState) {
    const middlewares = [
        // Add other middleware on this line...
        socketIoMiddleware,

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    store.subscribe(() => {
        //console.log('new client state', store.getState());
    });

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;


export default configureStore;