import {takeEvery,call} from 'redux-saga/effects'
import store from "../store";
import {sendRequest} from "./Utils";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedContact, setStoreContacts, updateSelectedContact} from "../action/contactsAction";
import {setProducts, setSelectedProduct} from "../action/productsAction";
import {toast} from "react-toastify";

function getApiData(params){
    console.log(params.tcd);
    return {
        type: "GET_API_DATA",
        data: {
            tcd:params.tcd,
            tmg:params.tmg || {},
            category:params.category,
            method:params.method,
        }
    }
}

function setApiStatus(tcd, status) {
    return {
        type: "SET_API_STATUS",
        payload:{
            "tcd":tcd,
            "status":status
        }
    }
}

function setApiStatusReducer(state={tcd:null,status:null},action){
    switch (action.type){
        case "SET_API_STATUS":
            return {tcd:action.payload.tcd,status:action.payload.status}
        default:
            return state;
    }
}

function* apiSaga(){
    yield takeEvery("GET_API_DATA",apiWorkerSaga);
}

function* apiWorkerSaga(value) {
    let action = value.data;
    store.dispatch(setApiStatus(action.tcd,"PENDING"))
    try{
        const response = yield call(sendRequest,action);
        getApiDataSuccess(action,response);
    } catch{
        store.dispatch(setApiStatus(action.tcd,"FAILED"))
    }
}

function getApiDataSuccess(action, response) {

    const contact = store.getState().contactRedux.contact;
    const storeContacts = store.getState().contactRedux.contacts;
    console.log(response.data)

    switch (action.tcd) {
        case "GET_CONTACTS":
            store.dispatch(setStoreContacts(response.data));
            break;
        case "GET_PRODUCTS":
            store.dispatch(setProducts(response.data));
            break;
        case "GET_CONTACT_BY_ID":
            store.dispatch(setSelectedContact(response.data));
            break;
        case "GET_PRODUCT_BY_ID":
            store.dispatch(setSelectedProduct(response.data));
            break;
        case "ADD_CONTACT":
            store.dispatch(setStoreContacts([...storeContacts,response.data]))
            break;
        case "UPDATE_CONTACT":
            store.dispatch(updateSelectedContact(response.data));
            break;
        case "DELETE_CONTACT":
            const id = action.tmg.id;
            const newContactList = storeContacts.filter((contact)=>{
                return  contact.id !== id;
            });
            store.dispatch(setStoreContacts(newContactList));
            break;
    }
    store.dispatch(setApiStatus(action.tcd,"SUCCESS"))
}

export {apiSaga,getApiData,setApiStatusReducer}