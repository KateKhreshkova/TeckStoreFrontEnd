import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._items = [{
            id: 0,
            name: "Cotton T-Shirt",
            brand: "",
            quantity: 2,
            price: 29,
            img : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp"
        }
        ]
        makeAutoObservable(this);
    }
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    add(item){
        this._items.push(item);
    }
    getById(id){
        return this._items.find(item => item.id === id);
     }
    //  addItem  (newItem) {
    //     setBasket((prevBasket) => {
    //         const itemExists = items.find(i => i.id === newItem.id);
    //         if (itemExists) {
    //             return {
    //                 items: prevBasket.items.map(i =>
    //                     i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
    //                 ),
    //             };
    //         } else {
    //             return {
    //                 items: [...prevBasket.items, { ...newItem, quantity: 1 }],
    //             };
    //         }
    //     });
    // };
}