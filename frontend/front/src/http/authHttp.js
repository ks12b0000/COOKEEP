import Http from "./http";

class AuthHttp extends Http {
    // 로그인 여부 확인
    getIsLoggedIn = async () => {
        try {
            const res = await this.axios.get("auth/user/login");
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 마이페이지
    getMypage = async (id) => {
        try {
            const res = await this.axios.get(`auth/user/mypage?user_id=${id}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 마이페이지 알림 리스트 불러오기
    getAlarmList = async (user_id, num) => {
        try {
            const res = await this.axios.get(`auth/user/notification/list/${user_id}?page=${num}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //현재 비밀번호 확인
    postCheckPassword = async (user_id, params) => {
        try {
            const res = await this.axios.post(`auth/user/check/password/${user_id}`, params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //아이디 변경
    putUpdateUsername = async (user_id, params) => {
        try {
            const res = await this.axios.put(`auth/user/update/username/${user_id}`, params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //이메일 변경
    putUpdateEmail = async (user_id, params) => {
        try {
            const res = await this.axios.put(`auth/user/update/email/${user_id}`, params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //비밀번호 변경
    putUpdatePassword = async (user_id, params) => {
        try {
            const res = await this.axios.put(`auth/user/update/password/${user_id}`, params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //회원 탈퇴
    deleteUser = async (user_id) => {
        try {
            const res = await this.axios.delete(`auth/user/delete/${user_id}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //내가 쓴 게시글 목록 조회
    getMyPosts = async (user_id) => {
        try {
            const res = await this.axios.get(`auth/user/board/list/${user_id}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //내가 좋아요한 글 목록 조회
    getMyLikes = async (user_id) => {
        try {
            const res = await this.axios.get(`auth/user/like/list/${user_id}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

}
export default AuthHttp;
