import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ConnectedApplicationContainer from './components/ApplicationContainer';
import RankBoards from './components/RankBoards';
import ConnectedRankBoardContainer from './components/RankBoardContainer';


//There are many options for setting up your routes.  Refer to the react-router docs and choose what works best for your app
export default (

    <Route path="/" component={ConnectedApplicationContainer}>
        <IndexRoute component={RankBoards}/>
        <Route path="/RankBoards" component={RankBoards}/>
        <Route path="/RankBoard/:id" component={ConnectedRankBoardContainer}/>
    </Route>
);
