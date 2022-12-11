import Http from "./http";

class UserHttp extends Http {

    postSignUp = async (params) => {
        try {
            const { data } = await this.axios.get('user/join',params);
            return data;
        } catch (err) {
            throw err;
        }
    };

    getCheckUsername = async (username) => {
        try {
            const { data } = await this.axios.get(`user/duplicate?username=${username}`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    postLogin = async (params) => {
        try {
            const { data } = await this.axios.post('user/login', params);
            return data;
        } catch (err) {
            throw err;
        }
    };

}
export default UserHttp;