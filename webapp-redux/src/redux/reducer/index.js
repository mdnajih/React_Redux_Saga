import {combineReducers} from "redux";
import {contactsReducer} from "./contactsReducer";

export const  allReducers = combineReducers({
    contactRedux:contactsReducer,
});