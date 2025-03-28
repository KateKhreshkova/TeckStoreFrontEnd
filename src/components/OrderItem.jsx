import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import PurpleButton from "./PurpleButton.jsx";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {ORDER_ROUTE} from "../utils/consts.jsx";

const OrderItem = ({order}) => {
    const navigate = useNavigate();
    return (
        <Container className="order-tracking p-3 rounded border-bottom">
            <Row className="justify-content-between align-items-center">
                <Col>
                    <p className="mb-1 text-muted" >
                        ORDER <span className={"text-dark"}>#{order.id}</span>
                    </p>
                    <p className="mb-1 text-muted">Made at: <span className={"text-dark"}>{order.madeAt}</span></p>
                    <p className="text-muted">Total: <span className={"text-dark"}>${order.total}</span></p>
                </Col>
                <Col className="text-end">
                    <PurpleButton onClick={() => navigate(ORDER_ROUTE + "/" + order.id)}>More info<AiOutlineArrowRight/></PurpleButton>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderItem;
