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

//const reduxState = loadReduxState();
const store = configureStore();
// store.subscribe(throttle(() => {
//     setDataInSessionStorage({
//         rankSession: {
//             userName: store.getState().applicationSession.userName
//         }
//     });
// }, 1000));

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

registerServiceWorker();