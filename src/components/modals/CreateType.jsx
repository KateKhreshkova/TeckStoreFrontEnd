import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceAPI.js";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = React.useState("");
    const addType = () => {
        try{
            createType({name: value}).then(data => {
                setValue("");
                onHide()
            });
        } catch (error) {
            alert(error.message);
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
                    Add Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Enter type name"} value={value}
                                  onChange={e => setValue(e.target.value)}>
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;