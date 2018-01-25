import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadReduxState, setDataInSessionStorage} from './store/sessionStorage';
import throttle from 'lodash/throttle';
import registerServiceWorker from './registerServiceWorker';

const reduxState = loadReduxState();
const store = configureStore(reduxState);
// store.subscribe(throttle(() => {
//     setDataInSessionStorage({
//         reduxState: store.getState()
//     });
// }, 1000));

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

registerServiceWorker();