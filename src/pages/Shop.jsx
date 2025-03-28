import React, {useContext, useEffect, useState} from 'react';
import TypeBar from "../components/TypeBar.jsx";
import BrandBar from "../components/BrandBar.jsx";
import {Col, Container, Row} from "react-bootstrap";
import DeviceList from "../components/DeviceList.jsx";
import {observer} from "mobx-react/src";
import {Context} from "../main.jsx";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI.js";
import FilterForm from "../components/FilterForm.jsx";

const Shop = observer(() => {
    const {device} = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => {
            device.types = data
        })
    }, [])
    useEffect(() => {
        fetchBrands().then(data => device.brands = data)
    }, [])
    useEffect(() => {
        fetchDevices().then(data => device.devices = data)
    }, [])
    const [filteredItems, setFilteredItems] = useState([])
    useEffect(() => {
        setFilteredItems(device.devices);
    }, [device.devices]);
    return (
        <div style={{ backgroundColor: "#eee", minHeight: "100vh", marginTop: "0"}}>
            <Container style={{paddingTop:"1rem", marginLeft: 0}} className={"d-block"}>
                <Row>
                    <Col md={3}>
                        {/*<TypeBar/>*/}
                        <FilterForm setFilteredItems={setFilteredItems}></FilterForm>
                    </Col>
                    <Col md={9}>
                        <DeviceList devices={filteredItems}></DeviceList>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Shop;