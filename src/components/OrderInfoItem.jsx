// import React from 'react';
// import {Row} from "react-bootstrap";
// import ImageComponent from "./ImageComponent.jsx";
//
// const OrderInfoItem = ({orderDeviceContract}) => {
//     return (
//         <Row className={"w-100 d-flex align-items-center justify-content-between flex-row"}>
//                 <ImageComponent img={orderDeviceContract.deviceContract.image} style={{height: "200px", display: "inline"}}></ImageComponent>
//
//             <span>Name: {orderDeviceContract.deviceContract.name}</span>
//             <span>Qty: {orderDeviceContract.quantity}</span>
//         </Row>
//     );
// };
//
// export default OrderInfoItem;
import React from 'react';
import { Row, Col } from "react-bootstrap";
import ImageComponent from "./ImageComponent.jsx";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts.jsx";

const OrderInfoItem = ({ orderDeviceContract }) => {
    const navigate = useNavigate();
    return (
        <Row className="w-100 d-flex align-items-center py-3 border-bottom flex-nowrap" style={{height: '300px'}
        }>
            <Col xs="auto" className="pe-3">
                <ImageComponent
                    img={orderDeviceContract.deviceContract.image}
                    style={{ width: "150px", borderRadius: "8px" }}
                />
            </Col>
            <Col className="d-flex flex-column justify-content-center" style={{ minWidth: "200px" }}>
                <span style={{ fontSize: "1.1rem", whiteSpace: "nowrap", fontWeight: "bold", cursor: "pointer", color: "black" }}
                      onClick={() => {navigate(DEVICE_ROUTE + "/" + orderDeviceContract.deviceContract.id)}}
                      onMouseOver={e => e.target.style.color = "purple"} onMouseOut={e => e.target.style.color = "black"}>
                    {orderDeviceContract.deviceContract.name}
                </span>
                <span className="text-muted">Qty: {orderDeviceContract.quantity}</span>
            </Col>
            <Col className="d-flex flex-column justify-content-center text-end">
                <span className="text-muted">Price:</span>
                <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                    ${orderDeviceContract.deviceContract.price}
                </span>
            </Col>
        </Row>
    );
};

export default OrderInfoItem;