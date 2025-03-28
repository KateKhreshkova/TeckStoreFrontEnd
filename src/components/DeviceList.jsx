import React, {useContext} from 'react';
import {observer} from "mobx-react/src";
import {Context} from "../main.jsx";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem.jsx";
import device from "../pages/Device.jsx";

const DeviceList = observer(({devices}) => {
    return (
        <Row className={"d-flex"}>
            {devices.map(device => {
                return <DeviceItem key={device.id} device={device}></DeviceItem>
            })}
        </Row>
    );
});

export default DeviceList;