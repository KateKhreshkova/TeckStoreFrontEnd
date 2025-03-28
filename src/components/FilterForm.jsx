import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../main.jsx';
import {fetchBrands, fetchTypes} from '../http/deviceAPI.js';
import {Form, Button, Row} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import PurpleButton from "./PurpleButton.jsx";
import {RxCross1} from "react-icons/rx";

const FilterForm = observer(({setFilteredItems}) => {
    const [disable, setDisable] = useState(false);
    const {device} = useContext(Context);
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTypes().then(data => (device.types = data));
        fetchBrands().then(data => (device.brands = data));
    }, []);

    const disableFilter = (e) => {
        e.preventDefault();
        setFilteredItems(device.devices)
        setSelectedType('')
        setSelectedBrand('')
        setSearchQuery('')
        setDisable(false)
    }
    const applyFilters = () => {
        let filtered = device.devices;
        if (selectedType !== '') {
            filtered = filtered.filter(device => device.type !== null && device.type === selectedType);
        }
        if (selectedBrand !== '') {
            console.log(selectedBrand);
            filtered = filtered.filter(device => device.brand !== null && device.brand === selectedBrand);
        }
        if (searchQuery !== '') {
            filtered = filtered.filter(device => device.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredItems(filtered);
    };

    return (
        <Form className="p-3 bg-light rounded shadow-sm">
            <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert device name"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Choose Type</Form.Label>
                <Form.Select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                    <option value="">All</option>
                    {device.types.map(type => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Choose brand</Form.Label>
                <Form.Select value={selectedBrand} onChange={(e) => {
                    // console.log(e.target.value)
                    setSelectedBrand(e.target.value)
                }}>
                    <option value="">All</option>
                    {device.brands.map(brand => (
                        <option key={brand.id} value={brand.name}>{brand.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <span className={"d-flex justify-content-around align-items-center flex-row"}>
                <PurpleButton onClick={(e) => {
                    e.preventDefault();
                    applyFilters()
                    setDisable(true)
                }}>Apply Filters</PurpleButton>
                {disable ?
                    <PurpleButton onClick={disableFilter}
                                  className={"d-flex justify-content-center align-items-center"}>
                        <span style={{marginRight: 5}}>Disable Filters</span>
                        <RxCross1/>
                    </PurpleButton>
                    : null}
            </span>
        </Form>
    );
});

export default FilterForm;
