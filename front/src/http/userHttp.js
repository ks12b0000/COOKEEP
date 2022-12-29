import Http from "./http";

class UserHttp extends Http {

    // 회원가입
    postSignUp = async (params) => {
        try {
            const res = await this.axios.post('user/join', params);
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


    // Email 중복 확인
    getCheckEmail = async (email) => {
        try {
            const res = await this.axios.get(`user/email/duplicate?email=${email}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 아이디 찾기
    postFindId = async (params) => {
        try {
            const res = await this.axios.post('user/find/id', params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 비밀번호 찾기
    postFindPassword = async (params) => {
        try {
            const res = await this.axios.post('user/find/password', params);
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

    // 구글 로그인
    getGoogleLogin = async (code) => {
        try {
            const res = await this.axios.get(`user/login/google?code=${code}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 네이버 로그인
    getNaverLogin = async (code, state) => {
        try {
            const res = await this.axios.get(`user/login/naver?code=${code}&state=${state}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 로그인 여부 확인
    postLogin = async (params) => {
        try {
            const res = await this.axios.post('user/login',params);
            return res;
        } catch (err) {
            throw err;
        }
    }

    // 로그아웃
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
