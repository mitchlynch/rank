import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ConnectedApplicationContainer from './components/ApplicationContainer';
import ConnectedHomeContainer from './components/HomeContainer';
import RankBoards from './components/RankBoards';
import ConnectedRankBoardContainer from './components/RankBoardContainer';



//There are many options for setting up your routes.  Refer to the react-router docs and choose what works best for your app
export default (

    <Route path="/" component={ConnectedApplicationContainer}>
        <IndexRoute component={ConnectedHomeContainer}/>
        <Route path="/home" component={ConnectedHomeContainer}/>
        <Route path="/rankboards" component={RankBoards}/>
        <Route path="/rankboard/:id" component={ConnectedRankBoardContainer}/>
    </Route>
);
