import React,{useEffect} from 'react'
import user from '../images/user.png'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeSelectedContact} from "../redux/action/contactsAction";

export default function ContactDetails(props) {



    const selectedContact = useSelector((state) => state.contactRedux.contact);
    const dispatch =useDispatch();

    useEffect(()=>{
        return () => dispatch(removeSelectedContact())
    },[])

    //const {name,email,number} = props.location.state.contact;
    const {name,email,number} = selectedContact;

    return (
        <div className="row mt-5">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body px-5 text-center">
                        <img src={user} width="120" height="120" alt="user"/>
                        <h3>{name}</h3>
                        <div>{email}</div>
                        <div>{number}</div>
                    </div>
                </div>
            </div>
            <div className="container mt-3 text-center">
                <Link to="/" onClick={()=>dispatch(removeSelectedContact())}>
                    <button className="btn btn-primary"> Back to Home </button>
                </Link>
            </div>
        </div>


    )
}
