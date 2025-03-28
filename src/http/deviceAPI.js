import {$authHost, $host} from "./index.js";


export const createType = async (type) => {
    const {data} = await $authHost.post("/api/type", type);
    return data;
}

export const createBrand = async (type) => {
    const {data} = await $authHost.post("/api/brand", type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get("/api/type");
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get("/api/brand");
    return data;
}

export const fetchDevices = async () => {
    const {data} = await $host.get("/api/device");
    return data;
}
export const fetchDevice = async (id) => {
    const {data} = await $host.get("/api/device/" + id);
    return data;
}
export const createDevice = async (formData) => {
    const {data} = await $authHost.post("/api/device", formData);
    return data;
}

export const checkImg = async (formData) => {
    const {data} = await $authHost.post("/api/device/check", formData);
    return data;
}

export const deleteDevice = async (id) => {
    const {data} = await $authHost.delete("/api/device/" + id);
    return data;
}