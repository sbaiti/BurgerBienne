import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config/config.json";
import axios from "axios";

const apiEndpoint = apiUrl + "/User";
const tokenKey = "tokenUser";

http.setJwt(getJwt());


export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export async function loginUser(Login, Password) {
    const user = await axios.post(`${apiEndpoint}/login`, { Login, Password });
    return user;
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export const getUserById = async (idUser) => {
    const user = await axios.get(`${apiEndpoint}/${idUser}`, {
        headers: getAuthorization()
    })
    const { data } = user

    return data.userObject;
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const userDecoded = jwtDecode(jwt);
        console.log('userDecoded',userDecoded);
        return userDecoded
    } catch (ex) {
        return null;
    }
}

function getAuthorization() {
    return { Authorization: `Bearer ${getJwt()}` };
}