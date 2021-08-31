import React,{useState,useEffect} from 'react'
import { Form,Button,Card, Container } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {uuid} from "uuidv4";
import api from "./Api";
import {removeSelectedContact, setStoreContacts, updateSelectedContact} from "../redux/action/contactsAction";

export default function AddContact(props) {

  //const contact = !!props.location.state ? props.location.state.contact : {}
  //console.log(contact);
  const contact = useSelector((state)=>state.contactRedux.contact);
  const storeContacts = useSelector((state)=>state.contactRedux.contacts);
  const dispatch = useDispatch();

  useEffect(()=>{
    return () => dispatch(removeSelectedContact());
  },[])

  const[name,setName] = useState(contact?.name);
  const[email,setEmail] = useState(contact?.email);
  const[number,setNumber] = useState(contact?.number);

  const add =(e) =>{
    e.preventDefault();
    // if(name===""||email===""||number===""){
    //   alert("Please Fill all the fields");
    //   console.log("alert");
    //   return
    // }
    let contact = {name,email,number}
    //props.handleAddContact(contact);
    handleAddContact(contact)
    props.history.push("/");
  }

  const handleAddContact = async (contact) =>{
    const request = {id:uuid(),...contact};
    const response = await api.post("/contacts",request);
    dispatch(setStoreContacts([...storeContacts,response.data]))
  }

  const update =(e) =>{
    e.preventDefault();
    // if(name===""||email===""||number===""){
    //   alert("Please Fill all the fields");
    //   console.log("alert");
    //   return
    // }
    const id  = contact.id;
    const updateContact = {id,name,email,number}
    handleUpdateContact(updateContact)
    props.history.push("/");
  }

  const handleUpdateContact = async (contact) =>{
    const request = {...contact};
    const response = await api.put(`/contacts/${contact.id}`,request);
    dispatch(updateSelectedContact(response.data));
  }

    return (
      <Container>
      <Card className="mt-5 mx-auto" style={{ width: '30rem' }}>
      <Card.Body>
      {/*<Form onSubmit={!!contact.id?update:add}>*/}
      <Form onSubmit={!!contact?.id?update:add}>
        <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="Enter Name" value={name} onChange ={(e)=>{setName(e.target.value)}}/>
        </Form.Group>
  <Form.Group className="mb-3" controlId="formEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control required type="email" placeholder="Enter Email" value={email} onChange ={(e)=>{setEmail(e.target.value)}}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formNumber">
    <Form.Label>Mobile Number</Form.Label>
    <Form.Control required type="text" placeholder="Enter Mobile Number" value={number} onChange ={(e)=>{setNumber(e.target.value)}}/>
  </Form.Group>

    <Container className="text-center">
      <Button className="btn btn-success" type="submit">
        {!!contact?.id?"Update":"Add"}
      </Button>
    </Container>
  </Form>
        </Card.Body>
      </Card>
      </Container>
    )
}
