import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react/src";

const AppRouter = observer(() => {
    const {user, device} = useContext(Context)
    console.log(device)
    return (
        <Routes>

            {user.isAuth ? authRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} exact/>
            }) : null
            }

            {
                publicRoutes.map(({path, Component}) => {
                    console.log(path, Component);
                    return <Route key={path} path={path} element={<Component/>} exact/>
                })
            }
            <Route path="*" element={<Navigate to={"/"}/>}></Route>
        </Routes>
    );
});

export default AppRouter;