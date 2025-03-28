import {Image} from "react-bootstrap";
import {observer} from "mobx-react/src";
import {DEVICE_ROUTE} from "../utils/consts.jsx";
import {useNavigate} from "react-router-dom";
import ImageComponent from "./ImageComponent.jsx";

const CartItem = observer(({basket, item, setBasket}) => {
    const navigate = useNavigate();
    return (
        <div className={"row mb-4 d-flex justify-content-between align-items-center my-4"}>
            <div className={"col-md-2 col-lg-2 col-xl-2"}>
                <ImageComponent img={item.image} style={{width: "75px"}}></ImageComponent>
            </div>
            <div className={"col-md-3 col-lg-3 col-xl-3"}>
                <h6 className={"text-muted"}>Item</h6>
                <h6 className={"mb-0"}>{item.name}</h6>
            </div>
            <div className={"col-md-3 col-lg-3 col-xl-2 d-flex"}>
                <button
                    onClick={() => {
                        if (item.quantity > 1) {
                            basket.items = basket.items.map(i =>
                                i.id === item.id ? {...i, quantity: i.quantity - 1} : i
                            );
                            setBasket({...basket});
                        }
                    }}
                    className={"btn btn-link px-2 d-flex align-items-center justify-content-center"}>
                    <Image src={"src/styles/assets/minus-sign.png"} style={{width: 14, height: 14}} onClick={() => navigate(DEVICE_ROUTE + "/" + item.id)}></Image>
                </button>
                <span style={{fontSize: 20}} className={"text-center text-secondary"}>{item.quantity}</span>
                <button
                    onClick={() => {
                        basket.items = basket.items.map(i =>
                            i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                        );
                        setBasket({...basket});
                    }}
                    className={"btn btn-link px-2 d-flex align-items-center justify-content-center"}>
                    <Image src={"src/styles/assets/plus.png"} style={{width: 14, height: 14}}></Image>
                </button>
            </div>
            <div className={"col-md-3 col-lg-2 col-xl-2 offset-lg-1"}>
                <h6 className={"mb-0"}>$ {item.price}</h6>
            </div>
            <div className={"col-md-1 col-lg-1 col-xl-1 text-end"}>
                <Image
                    src={"src/styles/assets/delete.png"}
                    style={{height: 16, width: 16, cursor: "pointer"}}
                    onClick={() => {
                        const updatedItems = basket.items.filter(i => i.id !== item.id);
                        setBasket({...basket, items: updatedItems});
                    }}
                />
            </div>
        </div>
    );
});

export default CartItem;