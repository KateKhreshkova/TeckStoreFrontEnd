import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    setUser(user) {
        this._user = user;
    }

    getIsAuth() {
        return this._isAuth;
    }

    getUser() {
        return this._user;
    }

    get isAuth() {
        return this._isAuth;
    }

    set isAuth(value) {
        this._isAuth = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
}