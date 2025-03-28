

import {createContext, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx";
import UserStore from "./store/UserStore.jsx";
import DeviceStore from "./store/DeviceStore.jsx";
import BasketStore from "./store/BasketStore.jsx";
import OrderStore from "./store/OrderStore.jsx";

export const Context = createContext(null)
export const REACT_APP_API_URL="http://localhost:8080/"
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Context.Provider value ={
            {
                user: new UserStore(),
                device : new DeviceStore(),
                basket : new BasketStore(),
                orders : new OrderStore()
            }}>
            <App></App>
        </Context.Provider>
    </StrictMode>,
    )

