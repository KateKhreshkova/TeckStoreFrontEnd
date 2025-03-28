import {observer} from "mobx-react/src";
import {DEVICE_ROUTE, SHOP_ROUTE} from "../utils/consts.jsx";
import {useContext, useEffect, useState} from "react";
import CartItem from "../components/CartItem.jsx";
import ConfirmOrder from "../components/modals/ConfirmOrder.jsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../main.jsx";

const Basket = observer(() => {
    const {user} = useContext(Context);
    const {device} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem("basket");
        return savedBasket ? JSON.parse(savedBasket) : {items: []};
    });
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);
    const [total, setTotal] = useState(0);
    useEffect(() => {

        const totalPrice = basket.items ? basket.items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0) : 0;
        setTotal(totalPrice);
    }, [basket]);
    const [deliveryPrice, setDeliveryPrice] = useState(5);
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setDeliveryPrice(selectedValue === "1" ? 5 : 10);
    };
    useEffect(() => {
        basket.items.filter((item) => {
            device.devices.some(device => device.deviceId === item.id)
        })
    }, [device]);
    const navigate = useNavigate();
    return (
        <section className={"h-100 h-custom"}>
            <div className={"container py-5 h-100"}>
                <div className={"row d-flex justify-content-center align-items-center h-100"}>
                    <div className={"col-12"}>
                        <div className={"card card-registration card-registration-2"} style={{borderRadius: 15}}>
                            <div className={"card-body p-0"}>
                                <div className={"row g-0"}>
                                    <div className={"col-lg-8 d-flex flex-column justify-content-between"}>
                                        <div className={"p-5"}>
                                            <div className={"d-flex justify-content-between align-items-center mb-5"}>
                                                <h1 className={"fw-bold mb-0"}>Shopping Cart</h1>
                                                <h6 className={"mb-0 text-muted"}>{basket.items ? basket.items.length : 0} items</h6>
                                            </div>
                                            {basket.items ? basket.items.map((item) => {
                                                return <CartItem item={item} basket={basket}
                                                                 setBasket={setBasket} onClick={() => {
                                                    navigate(DEVICE_ROUTE + "/" + item.id)
                                                }}></CartItem>
                                            }) : null}
                                            {!basket.items.length ?
                                                <div className={"h-100 text-center"} style={{height: "100%"}}> No
                                                    Items</div> : null}
                                        </div>
                                        <div className={"p-4"}>
                                            <a href={SHOP_ROUTE}
                                               style={{color: "black", textDecoration: "none", fontSize: 19}}>⬅︎ Back to
                                                shop</a>
                                        </div>
                                    </div>
                                    <div className={"col-lg-4 bg-body-tertiary"}>
                                        <div className={"p-5"}>
                                            <h3 className={"fw-bold mb-5 mt-2 pt-1"}>Summary</h3>
                                            <hr className={"my-4"}/>

                                            <div className={"d-flex justify-content-between mb-4"}>
                                                <h5 className={"text-uppercase"}>items {basket.items ? basket.items.length : 0}</h5>
                                                <h5>$ {total}</h5>
                                            </div>

                                            <h5 className={"text-uppercase mb-3"}>Shipping</h5>

                                            <div className={"mb-4 pb-2"}>
                                                <select className={"form-select"} onChange={handleChange}>
                                                    <option value={"1"}>Standard-Delivery- $5.00</option>
                                                    <option value={"2"}>Express- $10.00</option>
                                                </select>
                                            </div>

                                            <h5 className={"text-uppercase mb-3"}>Give code</h5>

                                            <div className={"mb-5"}>
                                                <div
                                                    className={"form-outline"}>
                                                    <input type="text" id="form3Examplea2"
                                                           className={"form-control form-control-lg"}/>
                                                    <label className={"form-label"} htmlFor="form3Examplea2">Enter your
                                                        code</label>
                                                </div>
                                            </div>
                                            <hr className={"my-4"}/>
                                            <div className={"d-flex justify-content-between mb-5"}>
                                                <h5 className={"text-uppercase"}>Total price</h5>
                                                <h5>$ {total + deliveryPrice}</h5>
                                            </div>
                                            <div
                                                className={"d-flex justify-content-center align-items-center flex-column"}>
                                                <button
                                                    className={"btn btn-dark d-block btn-lg"}
                                                    style={{width: "100%"}}
                                                    onClick={() => {
                                                        setModalVisible(true)
                                                    }}
                                                    disabled={basket.items.length === 0 || !user.isAuth}
                                                >
                                                    Confirm
                                                </button>
                                                {basket.items.length === 0 && (
                                                    <div className="text-danger mt-2">❌ Add Items To Your Cart</div>
                                                )}
                                                {!user.isAuth && (
                                                    <div className="text-danger mt-2">❌ Log In First</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmOrder show={modalVisible} onHide={() => setModalVisible(false)} items={basket.items}
                          total={total + deliveryPrice}></ConfirmOrder>
        </section>)
});

export default Basket;