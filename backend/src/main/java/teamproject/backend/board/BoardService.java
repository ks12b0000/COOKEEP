package teamproject.backend.board;

import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardReadResponse findById(Long board_id);
    List<BoardReadResponse> findByUserId(Long user_id);

    List<BoardReadResponse> findAll();

    List<BoardReadResponse> findByCategory(String category);

    void delete(Long user_id, Long board_id);

    void delete_err_thumbnail();

    String updateLikeOfBoard(Long board_id, User user);

    void update(Long board_id, BoardWriteRequest boardWriteRequest);

    Long saveComment(BoardCommentWriteRequest boardCommentWriteRequest);

    void updateComment(BoardCommentUpdateRequest request);

    void deleteComment(Long comment_id, Long user_id);

    List<BoardCommentResponse> findCommentByBoardId(Long board_id);

    List<BoardCommentResponse> findCommentByUserId(Long user_id);

    Long saveReply(BoardCommentReplyWriteRequest request);

    void updateReply(BoardCommentReplyUpdateRequest request);

    void deleteReply(Long reply_id, Long user_id);

    List<BoardCommentReplyResponse> findReplyByCommentId(Long comment_id);
}
