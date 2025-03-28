import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts.jsx";
import {login, registration} from "../http/userAPI.js";
import {observer} from "mobx-react/src";
import {Context} from "../main.jsx";

const Auth = observer(({style}) => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.user = data;
            user.isAuth = true;
            navigate(SHOP_ROUTE);
        } catch (e){
            alert(e.message);
        }
    }

    return (
        <div style={{...style, height: window.innerHeight - 54, marginTop: 80}}
             className={"d-flex justify-content-center align-items-md-start"}>
            <form className={"d-flex justify-content-center flex-column w-50 "}>
                <label
                    className={"form-label d-flex justify-content-center fw-bold"}>{isLogin ? "Sign in" : "Sign up"}</label>
                <div className="form-group w-100">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control"
                           placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group w-100">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control mb-2" id="exampleInputPassword1"
                           placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <span className={"d-flex align-items-center flex-row justify-content-between"}>
                    <button type="button" className="btn btn-outline-dark" onClick={click}>Submit</button>
                    <div>{isLogin ? "Don't have an account?" : "Already have an account?"}
                        <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
                                 style={{margin: 10}}>{isLogin ? "Sign up" : "Sign in"}</NavLink>
                    </div>
                </span>
            </form>
        </div>
    );
});

export default Auth;
