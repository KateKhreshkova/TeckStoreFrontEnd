import React from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand.jsx";
import CreateType from "../components/modals/CreateType.jsx";
import CreateDevice from "../components/modals/CreateDevice.jsx";

const Admin = () => {
    const [brandVisible, setBrandVisible] = React.useState(false);
    const [typeVisible, setTypeVisible] = React.useState(false);
    const [deviceVisible, setDeviceVisible] = React.useState(false);
    return (
        <Container className={"d-flex flex-column"}>
            <Button onClick={() => setTypeVisible(true)} variant={"outline-dark"} className={"mt-4 p-2"}>
                Add Type
            </Button>
            <Button onClick={() => setBrandVisible(true)} variant={"outline-dark"} className={"mt-4 p-2"}>
                Add Brand
            </Button>
            <Button onClick={() => setDeviceVisible(true)} variant={"outline-dark"}  className={"mt-4 p-2"}>
                Add Device
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}></CreateBrand>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}></CreateType>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}></CreateDevice>
        </Container>
    );
};

export default Admin;
