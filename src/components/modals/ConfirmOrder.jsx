import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import basket from "../../pages/Basket.jsx";
import {createOrder} from "../../http/orderAPI.js";

const ConfirmOrder = ({show, onHide, items, total}) => {

    const confirmOrder = async () => {
            const order = {
                orderDeviceContracts: items.map(i => ({
                    deviceContract: {
                        id: i.id,
                        price: i.price,
                        name: i.name,
                        infoContractList: i.infoContractList,
                        image: i.image,
                        brand: i.brand,
                        type: i.type,
                        rate: i.rate,
                        description: i.description
                    },
                    quantity: i.quantity,
                    id: null
                })),
                total: total,
                id: null,
                status: null
            }

             try {
                await createOrder(order)
                 alert("Order created successfully")
                 localStorage.setItem("basket", JSON.stringify({items: []}))
             } catch (error) {
                alert(error.message)
             }
            onHide()

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
                    Make an order?
                </Modal.Title>
            </Modal.Header>
            {/*<Modal.Body>*/}
            {/*    <h4>Centered Modal</h4>*/}
            {/*    <p>*/}
            {/*        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,*/}
            {/*        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac*/}
            {/*        consectetur ac, vestibulum at eros.*/}
            {/*    </p>*/}
            {/*</Modal.Body>*/}
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={confirmOrder}>Yes</Button>
                <Button onClick={onHide} variant={"outline-danger"}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmOrder;