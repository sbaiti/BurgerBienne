import http from "./httpService";
import { apiUrl } from "../config/config.json";
import axios from "axios";

const apiEndpoint = apiUrl + "/Slider";
const tokenKey = "tokenUser";

http.setJwt(getJwt());

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export async function getSliders() {
    const slider = await axios.get(`${apiEndpoint}/AllSlider`, { headers: getAuthorization() });
    return slider;
}

export async function addSliders(slider) {

    console.log(slider);
    const sliders = await axios.post(`${apiEndpoint}/addSlider`, slider, { headers: { ...getAuthorization(), 'content-type': 'multipart/form-data' } });
    return sliders;
}



function getAuthorization() {
    return { Authorization: `Bearer ${getJwt()}` };
}