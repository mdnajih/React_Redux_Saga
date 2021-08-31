import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import {uuid} from "uuidv4";
import api from './components/Api'
import ContactDetails from "./components/ContactDetails";
import {useDispatch, useSelector} from "react-redux";
import {setStoreContacts} from "./redux/action/contactsAction"
import {getApiData} from "./redux/saga/apiSaga";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

function App() {

   const [contacts, setContacts] = useState([]);
   const [searchTerm,setSearchTerm] = useState("");
   const [searchResults,setSearchResults] = useState([]);

   const contactsRedux = useSelector((state) => state);
   const dispatch = useDispatch();

    useEffect(()=>{
        let data = {
            tcd:"GET_CONTACTS",
            method:"GET"
        }
        dispatch(getApiData(data))
    },[]);

    return (
    <div>
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact
                    render={(props)=>(
                        <ContactList {...props}/>
                        //<ContactList {...props} contacts={searchTerm.length<1?contacts:searchResults} getContactId={handleRemoveContact} term={searchTerm} searchKeyword = {searchHandler}/>
                    )}
                />
                <Route path="/add"
                       render={(props)=>(
                           // <AddContact {...props} handleAddContact={handleAddContact} handleUpdateContact={handleUpdateContact}/>
                           <AddContact {...props}/>
                       )}
                />
                <Route path="/contact/:id"
                       component = {ContactDetails}
                />
                <Route path="/products"
                       component = {ProductList}
                />
                <Route path="/product/:id"
                       component = {ProductDetails}
                />
            </Switch>
        </Router>

    </div>
  );
}

export default App;
