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

    // id 중복 확인

    getCheckUsername = async (username) => {
        try {
            const res = await this.axios.get(`user/duplicate?username=${username}`);
            return res;
        } catch (err) {
            throw err;
        }
    };





    // 카카오 로그인
    getKaKaoLogin = async (code) => {
        try {
            const res = await this.axios.get(`user/login/kakao?code=${code}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 로그인 여부 확인
    postLogin = async (params) => {
        try{
            const res = await this.axios.post('user/login',params)
            return res;
        }catch (err){
            throw err;
        }
    }


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
