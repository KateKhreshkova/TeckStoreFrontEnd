import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts.jsx";
import {Button} from "react-bootstrap";
import PurpleButton from "./PurpleButton.jsx";

const LogOutBtn = ({children}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const logout = () => {
        user.isAuth = false;
        user.user = {};
        localStorage.removeItem("token")
        navigate(SHOP_ROUTE);
    }
    return (
        <PurpleButton onClick={logout} className={"d-flex justify-content-center align-items-center "}>
            {children}
        </PurpleButton>
    );
};

export default LogOutBtn;