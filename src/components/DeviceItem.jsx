import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DEVICE_ROUTE } from "../utils/consts.jsx";
import ImageComponent from "./ImageComponent.jsx";

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();

    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem("basket");
        return savedBasket ? JSON.parse(savedBasket) : { items: [] };
    });

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...'; // добавляем троеточие, если строка длиннее maxLength
        }
        return str;
    };

    const addItem = (newItem) => {
        setBasket((prevBasket) => {
            const itemExists = prevBasket.items.find(i => i.id === newItem.id);
            if (itemExists) {
                return {
                    items: prevBasket.items.map(i =>
                        i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            } else {
                return {
                    items: [...prevBasket.items, { ...newItem, quantity: 1 }],
                };
            }
        });
    };

    const removeItem = (itemId) => {
        setBasket((prevBasket) => {
            const updatedItems = prevBasket.items.map(i =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            ).filter(i => i.quantity > 0);
            return { items: updatedItems };
        });
    };

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);

    const basketItem = basket.items.find(i => i.id === device.id);

    return (
        <Col md={4} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    height: "100%",
                    position: "relative",
                    padding: "1rem",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    maxWidth: "250px",
                    display: "flex",
                    flexDirection: "column",
                }}
                className={"d-flex flex-column justify-content-between"}
                onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
                <div>
                    <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}
                         className={"d-flex justify-content-center align-items-center"}>
                        <ImageComponent
                            style={{ height: "150px", transition: "transform 0.3s ease" }}
                            img={device.image}
                            alt={device.name}
                        />
                    </div>
                    <div style={{ marginTop: "0.75rem" }}>
                        <h6 style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>{device.name}</h6>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.3rem" }}>
                            <div style={{ marginRight: "0.3rem", color: "#ffc107" }}>
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={i < Math.floor(device.rating) ? "fas fa-star" : "far fa-star"}>
                                    </i>
                                ))}
                            </div>
                            <small style={{ color: "#6c757d" }}>({device.rating ?? 0}/5)</small>
                        </div>
                        <p style={{ color: "#6c757d", fontSize: "0.85rem" }}>
                            {device.description ? truncateString(device.description, 60) : "No description available."}
                        </p>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto", // This ensures the buttons are pushed to the bottom
                }}>
                    <span style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "#6366f1"
                    }}>${device.price ?? "N/A"}</span>
                    {basketItem ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <button
                                style={{
                                    padding: "3px 7px",
                                    borderRadius: "45%",
                                    background: "#6366f1",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer"
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
                                    borderRadius: "45%",
                                    background: "#6366f1",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer"
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
                        <button
                            style={{
                                background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                                color: "white",
                                padding: "8px 15px",
                                borderRadius: "30px",
                                border: "none",
                                cursor: "pointer",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                addItem(device);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 3px 10px rgba(99, 102, 241, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </Col>
    );
};
export default DeviceItem;