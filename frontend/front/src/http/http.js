import axios from "axios";
class Http {
  constructor() {
    this.axios = Http.createAxios();
    const transformResponse = Http.transformResponse();
  }
  static createAxios() {
    return axios.create({
      baseURL: "http://13.124.82.115:8080",
      timeout: 30 * 1000,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://13.124.82.115:8080",
      },
    });
  }

  static transformResponse() {
    return {
      onFulfilled: (response) => {
        response.data = {
          statusCode: response.status,
          jsonResult:
            response.status === 200 || response.status === 201
              ? response.data
              : null,
        };
        return response;
      },
      onRejected: (error) => {
        return Promise.reject(error);
      },
    };
  }
}

export default Http;
