import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {Context} from "../main.jsx";
import {useParams} from "react-router-dom";
import {fetchDevice} from "../http/deviceAPI.js";
import plusIcon from "/src/styles/assets/plus.png";
import minusIcon from "/src/styles/assets/minus-sign.png";
import ImageComponent from "../components/ImageComponent.jsx";
import PurpleButton from "../components/PurpleButton.jsx";
import DeleteDevice from "../components/modals/DeleteDevice.jsx";

const Device = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {user} = useContext(Context);
    const {id} = useParams();
    const [device, setDevice] = useState({
        id: null,
        name: null,
        rate: null,
        price: null,
        status: null,
        infoContractList: [{}],
        image: '',
        img: ''
    });

    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem("basket");
        return savedBasket ? JSON.parse(savedBasket) : {items: []};
    });

    useEffect(() => {
        fetchDevice(id).then(data => setDevice(data));
    }, [id]);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);

    const addItem = (newItem) => {
        setBasket((prevBasket) => {
            const itemExists = prevBasket.items.find(i => i.id === newItem.id);
            if (itemExists) {
                return {
                    items: prevBasket.items.map(i =>
                        i.id === newItem.id ? {...i, quantity: i.quantity + 1} : i
                    ),
                };
            } else {
                return {
                    items: [...prevBasket.items, {...newItem, quantity: 1}],
                };
            }
        });
    };

    const removeItem = (itemId) => {
        setBasket((prevBasket) => {
            const updatedItems = prevBasket.items.map(i =>
                i.id === itemId ? {...i, quantity: i.quantity - 1} : i
            ).filter(i => i.quantity > 0);
            return {items: updatedItems};
        });
    };

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);

    const basketItem = basket.items.find(i => i.id === device.id);

    return (
        <Container className="mt-5 position-relative">
            {
                user.isAuth && user.user.role === "[ROLE_ADMIN]" ?
                    <PurpleButton className={"position-absolute "} onClick={() => setModalVisible(true)}>Delete</PurpleButton> : null
            }
            <Row>
                <Col md={6} className="mb-4 d-flex justify-content-center">
                    <ImageComponent img={device.image} style={{height: "400px", objectFit: "cover"}}/>
                </Col>

                <Col md={6}>
                    <h2>{device.name}</h2>
                    <p className="text-muted mb-4">SKU: {device.id}</p>
                    <p className="text-muted mb-4">Brand: {device.brand === "" ? "No brand" : device.brand}</p>
                    <p className="text-muted mb-4">Type: {device.type === "" ? "No type" : device.type}</p>
                    <div className="mb-3">
                        <span className="h4 me-2">${device.price}</span>
                        <span className="text-muted"><s>${device.price}</s></span>
                    </div>
                    <p className="mb-4">{device.description}</p>


                    {basketItem ? (
                        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            <button
                                style={{
                                    padding: "3px 7px",
                                    borderRadius: "30%",
                                    background: "#8b5cf6",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    width: "40px",
                                    fontSize: "24px"
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(device.id);
                                }}
                            >
                                -
                            </button>
                            <span>{basketItem.quantity}</span>
                            <button
                                style={{
                                    padding: "3px 7px",
                                    borderRadius: "30%",
                                    background: "#8b5cf6",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    width: "40px",
                                    fontSize: "24px"
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addItem(device);
                                }}
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <PurpleButton onClick={(e) => {
                                e.stopPropagation();
                                addItem(device);
                            }}>Add to Cart< /PurpleButton>
                    )
                    }
                    <ListGroup className="d-flex flex-column mt-3">
                        <h1>Characteristics</h1>
                        <ul>
                            {device.infoContractList.map((info, index) => (
                                <li key={info.id}
                                    className={index % 2 === 0 ? "list-group-item-secondary" : "border-0"}>
                                    <strong>{info.title}:</strong> {info.description}
                                </li>
                            ))}
                        </ul>
                    </ListGroup>
                </Col>
            </Row>
            <DeleteDevice id={device.id} show={modalVisible} onHide={() => setModalVisible(false)}></DeleteDevice>
        </Container>
    );
};

export default Device;