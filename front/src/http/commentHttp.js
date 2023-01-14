import Http from "./http";
class CommentHttp extends Http {
    // 댓글 리스트 불러오기
    getCommentList = async (boardId) => {
        try {
            const res = await this.axios.get(`board/comment/list?board_id=${boardId}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 댓글 생성
    postCommentUpload = async (params) => {
        try {
            const res = await this.axios.post("board/comment", params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 댓글 수정
    patchCommentEdit = async (params) => {
        try {
            const res = await this.axios.patch("board/comment", params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //댓글 삭제
    deleteComment = async (commentId, userId) => {
        try {
            const res = await this.axios.delete(`board/comment?comment_id=${commentId}?user_id=${userId}`);
            return res;
        } catch (err) {
            throw err;
        }
    };
}

export default CommentHttp;
