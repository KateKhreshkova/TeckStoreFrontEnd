import {makeAutoObservable} from "mobx";

export default class DeviceStore {

    get selectedType() {
        return this._selectedType;
    }

    set selectedType(value) {
        this._selectedType = value;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    set selectedBrand(value) {
        this._selectedBrand = value;
    }

    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }


    getSelectedType() {
        return this._selectedType;
    }

    setSelectedType(value) {
        this._selectedType = value;
    }

    get types() {
        return this._types;
    }

    set types(value) {
        this._types = value;
    }

    get brands() {
        return this._brands;
    }

    set brands(value) {
        this._brands = value;
    }

    get devices() {
        return this._devices;
    }

    set devices(value) {
        this._devices = value;
    }
}