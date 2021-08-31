import React from "react";
import {Modal,Button} from "react-bootstrap";
import warn from "../images/warn.png"

export default function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                        <img src={warn} alt="warn" width="30" height="30"/> Warning
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Do You Want to Delete?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onDelete}>Sure</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}