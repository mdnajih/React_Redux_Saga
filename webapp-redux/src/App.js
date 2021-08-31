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

function App() {

   const [contacts, setContacts] = useState([]);
   const [searchTerm,setSearchTerm] = useState("");
   const [searchResults,setSearchResults] = useState([]);

   const contactsRedux = useSelector((state) => state);
   const dispatch = useDispatch();

   const getRetrievedContacts = async () =>{
       const response = await api.get("/contacts")
       dispatch(setStoreContacts(response.data));
       return response.data;
   }

    const handleAddContact = async (contact) =>{
       const request = {id:uuid(),...contact};
       const response = await api.post("/contacts",request);
        setContacts([...contacts,response.data]);
    }

    const handleUpdateContact = async (contact) =>{
        const request = {...contact};
        const response = await api.put(`/contacts/${contact.id}`,request);
        const {id,name,email,number}=response.data
        setContacts(
            contacts.map((contact)=>{
                return contact.id === id?{...response.data}:contact;
            })
        );
    }

    const handleRemoveContact =async (id) => {
       await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact)=>{
             return  contact.id !== id;
      });
      setContacts(newContactList);
    };

    const searchHandler = (searchTerm) =>{
       setSearchTerm(searchTerm);
       if(searchTerm !== ""){
           const newContactList = contacts.filter((contact) =>{
               return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
           });
           if(newContactList){
               setSearchResults(newContactList);
           } else {
               setSearchResults(contacts);
           }
       }
    };

    useEffect(()=>{
        // const getRetreivedList = JSON.parse(localStorage.getItem("contacts"));
        // if(getRetreivedList){
        //     setContacts(getRetreivedList);
        // }
        const getAllContacts = async () =>{
           const allContacts = await getRetrievedContacts();
           if(allContacts){setContacts(allContacts)}
        };
        getAllContacts();
    },[]);

    useEffect(()=>{
            //localStorage.setItem("contacts",JSON.stringify(contacts));
        },[contacts]);

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
                           <AddContact {...props} handleUpdateContact={handleUpdateContact}/>
                       )}
                />
                <Route path="/contact/:id"
                       component = {ContactDetails}
                />
            </Switch>
        </Router>

    </div>
  );
}

export default App;
