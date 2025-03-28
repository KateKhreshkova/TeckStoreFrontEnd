import React from 'react';
import {Button, Modal} from "react-bootstrap";
import PurpleButton from "../PurpleButton.jsx";
import {deleteDevice} from "../../http/deviceAPI.js";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts.jsx";

const DeleteDevice = ({onHide, show, id}) => {
    const navigate = useNavigate();
    const deleteItem = async () => {
        try {
             await deleteDevice(id);
            alert("Successfully deleted device");
            onHide();
            navigate(SHOP_ROUTE)
        } catch (error) {
            alert(error);
            onHide();
        }

    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Device?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <PurpleButton onClick={deleteItem}>Yes</PurpleButton>
                <PurpleButton onClick={onHide} >No</PurpleButton>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDevice;