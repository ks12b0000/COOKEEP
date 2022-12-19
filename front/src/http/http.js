import axios from "axios";
<<<<<<< HEAD
// import { getCookie } from "../until/cookie";
// const token = getCookie("accesstoken");
=======
import { getCookie } from "../until/cookie";
const token = getCookie("accesstoken");
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
class Http {
    constructor() {
        this.axios = Http.createAxios();
        const transformResponse = Http.transformResponse();
    }
    static createAxios() {
        return axios.create({
<<<<<<< HEAD
            baseURL:"https://www.teamprojectvv.shop",
=======
            baseURL: process.env.REACT_APP_API_BASE_URL,
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
            timeout: 30 * 1000,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": "https://www.teamprojectvv.shop",
<<<<<<< HEAD
                // Authorization: `Bearer ${token}`
=======
                Authorization: `Bearer ${token}`
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
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
