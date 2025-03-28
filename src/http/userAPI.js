import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";
import {useContext} from "react";
import {Context} from "../main.jsx";
import {useNavigate} from "react-router-dom";


export const registration =  async (email, password) => {
    const {data} = await $host.post("/api/user/register", {email, password});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}

export const login =  async (email, password) => {
    const {data} = await $host.post("/api/user/login", {email, password});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
}

export const check =  async () => {
    console.log(localStorage.getItem("token"), "token");
    const {data} = await $authHost.get("/api/user/check");
    return data;
}
//
// export const logout = () => {
//     localStorage.removeItem("token");
//     user.isAuth = false;
//     user.user = null;
//     navigate(SHOP_ROUTE)
// }

