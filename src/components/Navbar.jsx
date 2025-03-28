import styles from "../styles/cart.module.css"
import React, {useContext, useState} from 'react';
import {Context} from "../main.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, SHOP_ROUTE} from "../utils/consts.jsx";
import {observer} from "mobx-react";
import {Button, Form, InputGroup} from "react-bootstrap";
import LogOutBtn from "./LogOutBtn.jsx";
import PurpleButton from "./PurpleButton.jsx";
import {VscAccount} from "react-icons/vsc";
import {MdSupervisorAccount} from "react-icons/md";
import {RiAccountCircleFill} from "react-icons/ri";
import {FaCartShopping} from "react-icons/fa6";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`${SHOP_ROUTE}?search=${searchQuery}`);
        }
    };

    const logout = () => {
        user.isAuth = false;
        user.user = {};
        localStorage.removeItem("token");
        localStorage.removeItem("basket");
        navigate(SHOP_ROUTE);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{marginBottom: 0}}>
            <div className="container-fluid">
                <NavLink
                    className={styles.name}
                    to={SHOP_ROUTE}>
                    TechStore
                </NavLink>
                <div className="d-flex justify-content-end align-items-center" style={{width: "100%"}}>
                    <div className="d-flex justify-content-between align-items-center" style={{gap: "20px"}}>
                        {/*<Form className="d-flex" onSubmit={handleSearchSubmit} style={{marginRight: "20px"}}>*/}
                        {/*    <InputGroup>*/}
                        {/*        <Form.Control*/}
                        {/*            type="search"*/}
                        {/*            placeholder="Search products"*/}
                        {/*            value={searchQuery}*/}
                        {/*            onChange={handleSearchChange}*/}
                        {/*            aria-label="Search"*/}
                        {/*            style={{*/}
                        {/*                borderRadius: "30px",*/}
                        {/*                padding: "10px",*/}
                        {/*                fontSize: "14px",*/}
                        {/*                borderColor: "#ccc",*/}
                        {/*                marginRight: "10px",*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*        <Button variant="light" type="submit" style={{borderRadius: "50%"}}*/}
                        {/*                className={"d-flex justify-content-center align-items-center"}>*/}
                        {/*            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"*/}
                        {/*                 className="bi bi-search" viewBox="0 0 16 16">*/}
                        {/*                <path*/}
                        {/*                    d="M11.742 10.742a6 6 0 1 0-1.42 1.42l3.758 3.758a1 1 0 0 0 1.415-1.415l-3.758-3.758zM12 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>*/}
                        {/*            </svg>*/}
                        {/*        </Button>*/}
                        {/*    </InputGroup>*/}
                        {/*</Form>*/}

                        <div className="d-flex" style={{gap: "10px"}}>
                            {user.isAuth && user.user.role === "[ROLE_ADMIN]" && (
                                <PurpleButton onClick={() => navigate(ADMIN_ROUTE)}
                                              className="d-flex justify-content-center align-items-center">
                                    Admin
                                </PurpleButton>
                            )}
                            {user.isAuth ? (
                                <LogOutBtn>
                                    <RiAccountCircleFill style={{marginRight: "7px"}}/>
                                    <span> Log Out</span>
                                </LogOutBtn>
                            ) : (
                                <PurpleButton onClick={() => navigate(LOGIN_ROUTE)}
                                              className="d-flex justify-content-around align-items-center">
                                    <RiAccountCircleFill style={{marginRight: "7px"}}/>
                                    <span> Log In</span>
                                </PurpleButton>
                            )}
                            <PurpleButton variant="outline-primary" onClick={() => navigate(BASKET_ROUTE)}
                                          className="d-flex justify-content-center align-items-center">
                                <FaCartShopping style={{marginRight: "7px"}}/>
                                <span>Cart</span>
                            </PurpleButton>
                            {user.isAuth && (
                                <PurpleButton
                                    onClick={() => navigate(ORDERS_ROUTE)} // Changed from ORDERS_ROUTE to SHOP_ROUTE
                                    className="btn-sm d-flex justify-content-end align-items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-house-door" viewBox="0 0 16 16">
                                        <path
                                            d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5V9.5a1 1 0 0 0-2 0v4a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6z"/>
                                    </svg>
                                </PurpleButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
});

export default NavBar;
