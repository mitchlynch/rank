import {createStore, compose, applyMiddleware} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import {getDataFromSessionStorage} from '../store/sessionStorage';

//TODO: this is temp code to just see how two client can communicate and disconnect/reconnect. normally be hardcoded port
const getPort = () => {
    let socketPort = getDataFromSessionStorage('socketPort');
    let urlParams = new URLSearchParams(window.location.search);
    const sp = urlParams.get('sp');
    if(!socketPort && sp) {
        socketPort = sp;
    } else {
        socketPort = 8000;
    }
    return socketPort;
};

const port = getPort();
const socket = io(`http://localhost:${port}`, { forceNew: true });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'socketio/');
let store;

const subscribeToConnectionEvent = (cb) => {
    socket.on('connect', () => cb({
        connectionState: 'Online',
        storeState: store.getState(),
        port
    }));
    socket.on('disconnect', () => cb({
        connectionState: 'Offline',
        storeState: store.getState(),
        port
    }));
    socket.on('reconnect', () => ({
        connectionState: 'Reconnect',
        storeState: store.getState(),
        port
    }));
    socket.on('connect_error', () => cb({
        connectionState: 'Error',
        storeState: store.getState(),
        port
    }));
};


function configureStoreProd(initialState) {

    const middlewares = [
        // Add other middleware on this line...
        socketIoMiddleware,
        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk
    ];

    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
        )
    );

    store.subscribe(() => {
        //console.log('new client state', store.getState());
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
    store = createStore(rootReducer, initialState, composeEnhancers(
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


export {
    subscribeToConnectionEvent
};

export default configureStore;