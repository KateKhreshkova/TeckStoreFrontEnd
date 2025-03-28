import {
    ADMIN_ROUTE,
    BASKET_ROUTE, DEVICE_ROUTE,
    LOGIN_ROUTE,
    ORDER_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE, SHOP_ROUTE
} from "./utils/consts.jsx";
import Admin from "./pages/Admin.jsx";
import Basket from "./pages/Basket.jsx";
import Orders from "./pages/Orders.jsx";
import Order from "./pages/Order.jsx";
import Auth from "./pages/Auth.jsx";
import Shop from "./pages/Shop.jsx";
import Device from "./pages/Device.jsx";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDER_ROUTE + "/:id",
        Component: Order
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: DEVICE_ROUTE + "/:id",
        Component: Device
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: ORDER_ROUTE + "/:id",
        Component: Order
    }
]