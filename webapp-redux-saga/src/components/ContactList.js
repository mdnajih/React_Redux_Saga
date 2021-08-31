import React, {useRef, useState} from 'react'
import ContactCard from './ContactCard';
import {Link} from "react-router-dom";
import {MDBCol} from "mdbreact";
import {useDispatch, useSelector} from "react-redux";
import api from "./Api";
import {setStoreContacts} from "../redux/action/contactsAction";
import {ToastContainer} from "react-toastify";

export default function ContactList(props) {

    const inputEle = useRef("");
    const [searchTerm,setSearchTerm] =useState("");
    const [searchResults,setSearchResults] = useState([]);

    const storeContacts = useSelector((state) => state.contactRedux.contacts);
    const dispatch = useDispatch();


    const deleteHandler = (id) => {
        //props.getContactId(id);
        handleRemoveContact(id);
    }

    const handleRemoveContact =async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = storeContacts.filter((contact)=>{
            return  contact.id !== id;
        });
        dispatch(setStoreContacts(newContactList));
    };

    const searchHandler = (searchTerm) =>{
        setSearchTerm(searchTerm);
        if(searchTerm !== ""){
            const newContactList = storeContacts.filter((contact) =>{
                return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
            });
            if(newContactList){
                setSearchResults(newContactList);
            } else {
                setSearchResults(storeContacts);
            }
        }
    };

    const storeSearchContacts = searchTerm.length<1?storeContacts:searchResults;

    //const renderedContactList = props.contacts.map((contact)=>{
    const renderedContactList =  storeSearchContacts.map((contact)=>{
        return(
            <ContactCard contact={contact} clickHandler={deleteHandler} key={contact.id}/>
        );
    });

    const getSearchTerm = () =>{
        //props.searchKeyword(inputEle.current.value);
        searchHandler(inputEle.current.value);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h2>Contact List</h2>
                </div>
                <div className="col">
                    <Link to="/add">
                    <button className="btn btn-primary float-end">Add Contact</button>
                    </Link>
                </div>
            </div>

            <MDBCol md="6">
                {/*<input ref={inputEle} className="form-control" type="text" placeholder="Search" aria-label="Search" value={props.term} onChange={getSearchTerm}/>*/}
                <input ref={inputEle} className="form-control" type="text" placeholder="Search" aria-label="Search" value={searchTerm} onChange={getSearchTerm}/>
            </MDBCol>
        {renderedContactList.length>0? renderedContactList :"No Contacts Available"}
        </div>
    )
}
