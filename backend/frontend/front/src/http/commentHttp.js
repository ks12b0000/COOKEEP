import Http from "./http";
class CommentHttp extends Http {

    // 댓글 생성
    postCommentUpload = async (params) => {
        try {
            const res = await this.axios.post('board/comment', params);
            return res;
        } catch (err) {
            throw err;
        }
    };
}

export default CommentHttp;
