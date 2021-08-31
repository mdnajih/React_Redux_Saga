import React from 'react'
import {ListGroup,Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {links}from './Link.css'
import MyVerticallyCenteredModal from "./Modal";
import {useDispatch} from "react-redux";
import {setSelectedContact} from "../redux/action/contactsAction";

export default function ContactCard(props) {

    const [modalShow, setModalShow] = React.useState(false);

    const dispatch = useDispatch();

    const {id,name,email,number} = props.contact;

    return (
        <div className="container mt-3">
                <ListGroup>
                <ListGroup.Item>

                    <div className="row">

                        <div className="col">
                            {/*<Link className={`links`} to={{pathname:`/contact/${id}`,state:{contact:props.contact}}}>*/}
                            <Link className={`links`} to={{pathname:`/contact/${id}`}} onClick={() => dispatch(setSelectedContact(props.contact))}>
                            <h3>{name}</h3>
                            <div>{email}</div>
                            </Link>
                        </div>

                        <div className="col" >
                            <div className='d-flex' style={{float :'right'}}>
                                {/*<Link className="pl-3" to={{pathname:`/add`,state:{contact:props.contact}}}>*/}
                                <Link className="pl-3" to={{pathname:`/add`}} onClick={() => dispatch(setSelectedContact(props.contact))}>
                                    <Button className="btn btn-warning" style={{marginRight : '20px'}} type = "button">Edit</Button>
                                </Link>
                                <Button className="btn btn-danger"  type = "button" onClick={()=>setModalShow(true)}>Delete</Button>
                            </div>

                        </div>

                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onDelete={() => {
                                props.clickHandler(id)
                                setModalShow(false)
                            }}
                        />
                    </div>
                </ListGroup.Item>

                </ListGroup>
            
            </div>
    )
}
