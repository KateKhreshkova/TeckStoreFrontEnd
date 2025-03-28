import React, {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts.jsx";
import LogOutBtn from "../components/LogOutBtn.jsx";
import {getOrders} from "../http/orderAPI.js";
import OrderItem from "../components/OrderItem.jsx";

const Orders = () => {
    const { user, orders } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const logout = () => {
        user.isAuth = false;
        user.user = {};
        localStorage.removeItem("token");
        localStorage.removeItem("basket");
        navigate(SHOP_ROUTE);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (user.isAuth) {
                try {
                    setLoading(true);
                    orders.orders = await getOrders(user.user.sub);
                } catch (e) {
                    console.error("Mistake Loading Orders", e);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOrders();
    }, [user.isAuth]);

    return (
        <div style={{ backgroundColor: "#eee", minHeight: "100vh" }} className="container-fluid">
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="/">Shop</a></li>
                                <li className="breadcrumb-item" aria-current="page">User</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor"
                                     className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                <h5 className="my-3">{user.user?.sub}</h5>
                                <p className="text-muted mb-3">{user.user?.role}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <LogOutBtn>Log Out</LogOutBtn>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="mb-3">Your Orders</h5>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : orders?.orders?.length > 0 ? (
                                    orders.orders.map((order, index) => (
                                        <OrderItem order={order}></OrderItem>
                                    ))
                                ) : (
                                    <p>No orders found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
