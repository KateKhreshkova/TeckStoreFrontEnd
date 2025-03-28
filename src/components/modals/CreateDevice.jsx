import React, {useContext, useEffect, useState} from 'react';
import {
    Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormControl, Image, Modal, Row
} from "react-bootstrap";
import {Context} from "../../main.jsx";
import {checkImg, createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI.js";
import {observer} from "mobx-react/src";


const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => {
            device.types = data
        })
    }, [])
    useEffect(() => {
        fetchBrands().then(data => device.brands = data)
    }, [])
    const [type, setType] = useState({});
    const [brand, setBrand] = useState({});
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [info, setInfo] = useState([]);
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    }
    const addDevice = async () => {
        try {
            const formData = new FormData();
            const dto = {
                name: name,
                description: description,
                price: price,
                brand: brand.name,
                type: type.name,
                infoContractList: info.map(i => ({
                    title: i.title,
                    description: i.description,
                }))
            };
            formData.append("dto", JSON.stringify(dto));
            formData.append("file", file)
            const response = await createDevice(formData);

            alert("Device created successfully.");
            onHide();
        } catch (error) {
            alert("Error creating device");
        }
    };
    return (<Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-2 mb-3"}>
                        <DropdownToggle>{type.name !== undefined ? type.name : "Choose a type"}</DropdownToggle>
                        <DropdownMenu>
                            {device.types.map((type) => (
                                <DropdownItem onClick={() => setType(type)} key={type.id}>{type.name}</DropdownItem>))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className={"mt-2 mb-3"}>
                        <DropdownToggle>{brand.name !== undefined ? brand.name : "Choose a brand"}</DropdownToggle>
                        <DropdownMenu>
                            {device.brands.map((brand) => (<DropdownItem onClick={() => setBrand(brand)}
                                                                         key={brand.id}>{brand.name}</DropdownItem>))}
                        </DropdownMenu>
                    </Dropdown>
                    <FormControl className={"mt-2"} placeholder={"Price"} type={"number"} value={price}
                                 onChange={e => setPrice(Number(e.target.value))}></FormControl>
                    <FormControl className={"mt-2"} placeholder={"Enter device name"} value={name}
                                 onChange={e => setName(e.target.value)}></FormControl>
                    <FormControl className={"mt-2"} placeholder={"Enter description"} value={description}
                                 onChange={e => setDescription(e.target.value)}></FormControl>
                    <FormControl className={"mt-2"} placeholder={"Choose an image"} type={"file"}
                                 onChange={selectFile}></FormControl>
                    <Button className={"mb-2 mt-3"} onClick={() => addInfo()}
                            variant={"outline-dark"}>Add new characteristic</Button>
                    {info.map(i => <Row className={"mt-2"} key={i.number}>
                        <Col md={4}>
                            <FormControl placeholder={"Insert name of a characteristic"}
                                         value={i.title}
                                         onChange={(e) => changeInfo('title', e.target.value, i.number)}>
                            </FormControl>
                        </Col>
                        <Col md={4}>
                            <FormControl placeholder={"Characteristic description"}
                                         onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                         value={i.description}>
                            </FormControl>
                        </Col>
                        <Col md={4}>
                            <Button variant={"outline-danger"}
                                    onClick={() => removeInfo(i.number)}>Delete</Button>
                        </Col>
                    </Row>)}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>);
});

export default CreateDevice;