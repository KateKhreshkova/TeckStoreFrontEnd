import {$authHost, $host} from "./index.js";


export const getOrders = async (email) => {
    const {data} = await $authHost.get("/api/order/user/" + email);
    return data;
}

export const createOrder = async (basket) => {
    const {data} = await $authHost.post("/api/order/", basket);
    return data;
}

export const getOrder = async (id) => {
    const {data} = await $authHost.get("/api/order/" + id);
    return data;
}