import Http from "./http";

class UserHttp extends Http {
    postSignUp = async (params) => {
        try {
            const res = await this.axios.get('user/join',params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    getCheckUsername = async (username) => {
        try {
            const res = await this.axios.get(`user/duplicate?username=${username}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    postLogin = async (params) => {
        try {
            const res = await this.axios.post('user/login', params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    getLogout = async () => {
        try {
            const res = await this.axios.get('user/logout');
            return res;
        } catch (err) {
            throw err;
        }
    };
}
export default UserHttp;
