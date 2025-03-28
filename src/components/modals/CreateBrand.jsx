import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand, createType} from "../../http/deviceAPI.js";

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = React.useState("");
    const addBrand = () => {
        try {
            createBrand({name: value}).then(data => {
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
                    Add Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Enter brand name"} value={value}
                                  onChange={e => setValue(e.target.value)}>
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;