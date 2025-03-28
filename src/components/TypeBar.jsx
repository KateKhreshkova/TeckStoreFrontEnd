import React, {useContext, useState} from 'react';

import {observer} from "mobx-react/src";
import {Context} from "../main.jsx";
import { ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context);
    return (

        <ListGroup className="list-group">
            {device.types.map(type => {
                const isActive = device.selectedType === type;
                return (
                    <ListGroup.Item
                        action variant={"light"}
                        key={type.id}
                        onClick={() => {
                            device.selectedType === type ? device.setSelectedType(null) : device.setSelectedType(type);
                        }}
                        className={isActive ? "active" : "list-group-item"}
                    >
                        {type.name}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>)
});

export default TypeBar;