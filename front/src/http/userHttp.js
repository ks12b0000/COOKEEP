import Http from "./http";

class UserHttp extends Http {
<<<<<<< HEAD
=======
    // 회원가입
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
    postSignUp = async (params) => {
        try {
            const res = await this.axios.get('user/join',params);
            return res;
        } catch (err) {
            throw err;
        }
    };

<<<<<<< HEAD
=======
    // id 중복 확인
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
    getCheckUsername = async (username) => {
        try {
            const res = await this.axios.get(`user/duplicate?username=${username}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

<<<<<<< HEAD
=======
    // 로그인 
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
    postLogin = async (params) => {
        try {
            const res = await this.axios.post('user/login', params);
            return res;
        } catch (err) {
            throw err;
        }
    };

<<<<<<< HEAD
=======
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
    getisLoggedIn = async () => {
        try {
            const res = await this.axios.get('auth/user/login');
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 로그아웃
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
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
