import axios from "axios";
import { getCookie } from "../until/cookie";
const token = getCookie("accesstoken");
class Http {
    constructor() {
        this.axios = Http.createAxios();
        const transformResponse = Http.transformResponse();
    }
    static createAxios() {
        return axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            timeout: 30 * 1000,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "https://www.teamprojectvv.shop",
                Authorization: `Bearer ${token}`
            }
        });
    }

    static transformResponse() {
        return {
            onFulfilled: (response) => {
                response.data = {
                    statusCode: response.status,
                    jsonResult: response.status === 200 || response.status === 201 ? response.data : null
                };
                return response;
            },
            onRejected: (error) => {
                return Promise.reject(error);
            }
        };
    }
}

export default Http;