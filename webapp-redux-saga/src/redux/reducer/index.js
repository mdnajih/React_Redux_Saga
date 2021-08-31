import {combineReducers} from "redux";
import {contactsReducer} from "./contactsReducer";
import {productReducers} from "./productsReducer";
import {setApiStatusReducer} from "../saga/apiSaga";

export const  allReducers = combineReducers({
    contactRedux:contactsReducer,
    productRedux:productReducers,
    apiStatusRedux:setApiStatusReducer
});