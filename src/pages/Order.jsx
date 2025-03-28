// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getOrder } from "../http/orderAPI.js";
// import { observer } from "mobx-react";
// import { Container, Row, Spinner } from "react-bootstrap";
// import OrderInfoItem from "../components/OrderInfoItem.jsx";
//
// const Order = observer(() => {
//     const { id } = useParams();
//     const [isLoading, setLoading] = useState(true);
//     const [order, setOrder] = useState({
//         id: null,
//         orderDeviceContracts: [],
//         total: null,
//         status: "",
//     });
//
//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const data = await getOrder(id);
//                 setOrder(data);
//             } catch (error) {
//                 console.error("Ошибка загрузки заказа:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         console.log(order)
//         fetchOrder();
//     }, [id]);
//
//     return (
//         <Container>
//             {isLoading ? (
//                 <Spinner animation="border" />
//             ) :
//                 order.orderDeviceContracts.map((orderDevice) => (
//                     <OrderInfoItem key={orderDevice.id} orderDeviceContract={orderDevice}/>
//                 ))
//             }
//         </Container>
//
//     );
// });
//
// export default Order;
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getOrder} from "../http/orderAPI.js";
import {observer} from "mobx-react";
import {Container, Row, Spinner, Button} from "react-bootstrap";
import OrderInfoItem from "../components/OrderInfoItem.jsx";
import {ORDER_ROUTE, ORDERS_ROUTE} from "../utils/consts.jsx";
import PurpleButton from "../components/PurpleButton.jsx";
import {AiOutlineArrowLeft} from "react-icons/ai";

const Order = observer(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [order, setOrder] = useState({
        id: null,
        orderDeviceContracts: [],
        total: null,
        status: "",
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrder(id);
                setOrder(data);
            } catch (error) {
                console.error("Ошибка загрузки заказа:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    return (
        <Container>
            {isLoading ? (
                <Spinner animation="border"/>
            ) : (
                <>
                    {order.orderDeviceContracts.map((orderDevice) => (
                        <OrderInfoItem key={orderDevice.id} orderDeviceContract={orderDevice}/>
                    ))}

                    <div style={{
                        backgroundColor: "#eee",
                        padding: "30px",
                        marginTop: "30px",
                        marginBottom: "30px",
                        borderRadius: "5px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                    }} className={"d-flex flex-row justify-content-between align-items-center"}>

                        <PurpleButton onClick={() => navigate(ORDERS_ROUTE)}>
                            <AiOutlineArrowLeft/>
                            Back to Profile page
                        </PurpleButton>
                        <div style={{marginRight: "30px"}}>
                            <h4>Order Information</h4>
                            <p><strong>Order ID :</strong> {order.id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Made at :</strong> {order.madeAt}</p>
                            <p><strong>Total:</strong> ${order.total} </p>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
});

export default Order;