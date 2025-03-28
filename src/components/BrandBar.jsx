import React, {useContext, useState} from 'react';
import {observer} from "mobx-react/src";
import {Context} from "../main.jsx";
import {Card, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    // const [isActive, setIsActive] = useState(false);
    const {device} = useContext(Context);
    return (
        <ListGroup style={{display: "flex", justifyContent: "space-between", flexDirection: "row", flexGrow: 0, flexWrap: "wrap", flexShrink:0, marginBottom: 15}}>
            {device.brands.map(brand => {
                let isActive = device.selectedBrand === brand;
                return (
                    <ListGroup.Item
                        style={{flex: '1 1 70px'}}
                        action variant={"light"} key={brand.id}
                        onClick={() => {
                            if (device.selectedBrand === brand) {
                                device.selectedBrand = null;
                            } else {
                                device.selectedBrand = brand;
                            }
                        }}
                        className={isActive ? "active" : "list-group-item"}>{brand.name}</ListGroup.Item>
                )
            })}
        </ListGroup>
    );
});

export default BrandBar;