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
    const sliders = await axios.post(`${apiEndpoint}/addSlider`, slider, { headers: { ...getAuthorization(), 'content-type': 'multipart/form-data' } });
    return sliders;
}

export async function deleteAllSliders() {
    const sliders = await axios.put(`${apiEndpoint}/deleteAllSlider`, { headers: { ...getAuthorization(), 'content-type': 'multipart/form-data' } });
    return sliders;
}

export async function deleteOneSlider(id) {
    const slider = await axios.put(`${apiEndpoint}/deleteSlider`, { id }, { headers: getAuthorization() });
    return slider;
}

function getAuthorization() {
    return { Authorization: `Bearer ${getJwt()}` };
}