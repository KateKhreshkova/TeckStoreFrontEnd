export default class OrderStore {
    constructor() {
        this._orders = [{}];
    }

    get orders() {
        return this._orders;
    }

    set orders(value) {
        this._orders = value;
    }
}