import Http from "./http";
class CommentHttp extends Http {
    // 댓글 생성
    postCommentUpload = async (params) => {
        try {
            const res = await this.axios.post("board/comment", params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 댓글 리스트 불러오기
    getCommentList = async (boardId, pageNum) => {
        try {
            const res = await this.axios.get(
              `board/comment/list?board_id=${boardId}&page=${pageNum}`
            );
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
            const res = await this.axios.delete(`board/comment?comment_id=${commentId}&user_id=${userId}`);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //대댓글 생성
    postReplyUpload = async (params) => {
        try {
            const res = await this.axios.post("board/comment/reply", params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 대댓글 리스트 불러오기
    getReplyList = async (commentId, pageNum) => {
        try {
            const res = await this.axios.get(
              `board/comment/reply/list?comment_id=${commentId}&page=${pageNum}`
            );
            return res;
        } catch (err) {
            throw err;
        }
    };

    // 대댓글 수정
    patchReplyEdit = async (params) => {
        try {
            const res = await this.axios.patch("board/comment/reply", params);
            return res;
        } catch (err) {
            throw err;
        }
    };

    //대댓글 삭제
    deleteReply = async (replyId, userId) => {
        try {
            const res = await this.axios.delete(`board/comment/reply?reply_id=${replyId}&user_id=${userId}`);
            return res;
        } catch (err) {
            throw err;
        }
    };
}

export default CommentHttp;
