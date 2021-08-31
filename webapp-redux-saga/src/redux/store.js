import {applyMiddleware, createStore} from "redux";
import {allReducers} from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga";

const reduxSaga = createSagaMiddleware();

const store = createStore(allReducers,composeWithDevTools(applyMiddleware(reduxSaga)));

reduxSaga.run(rootSaga);

export default store;