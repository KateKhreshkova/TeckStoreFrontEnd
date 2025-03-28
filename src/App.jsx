import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import NavBar from "./components/Navbar.jsx";
import {Context} from "./main.jsx";
import {check} from "./http/userAPI.js";
import {Container, Spinner} from "react-bootstrap";
import {jwtDecode} from "jwt-decode";

 function App() {
     const {basket} = useContext(Context);
     useEffect(() => {
         const items = JSON.parse(localStorage.getItem("cartItems"));
         if (items) {
             basket.items = items;
         }
     }, []);
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
     useEffect(() => {
         const fetchCheck = async () => {
             try {
                 console.log(localStorage.getItem("token"))
                 const response = await check();
                 if (response === true) {
                     user.isAuth = true;
                     user.user = jwtDecode(localStorage.getItem("token"));
                 } else {
                     user.isAuth = false;
                     user.user = null;
                     localStorage.removeItem("token");
                 }
             } catch (e) {
                 console.log(e.message);
             } finally {
                 setLoading(false);
             }
         };

         fetchCheck();
         }, []);
    if (loading) {
        return <Container className={"d-flex justify-content-center align-items-center "}>
            <Spinner variant={"dark"} className={"mt-5"}></Spinner>
        </Container>
    }
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <AppRouter></AppRouter>
        </BrowserRouter>
    )
}

export default App;
