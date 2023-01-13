package teamproject.backend.board;

import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardReadResponse getBoardReadResponseByBoardId(Long boardId);

    Board getBoardByBoardId(Long boardId);

    List<BoardReadResponse> getBoardReadResponseListByUserId(Long userId);

    List<BoardReadResponse> getBoardReadResponseListByFoodCategoryName(String categoryName);

    void delete(Long userId, Long boardId);

    String updateLikeOfBoard(Long boardId, User user);

    void update(Long boardId, BoardWriteRequest boardWriteRequest);

    Long saveComment(BoardCommentWriteRequest boardCommentWriteRequest);

    void updateComment(BoardCommentUpdateRequest request);

    void deleteComment(Long commentId, Long userId);

    List<BoardCommentResponse> findCommentByBoardId(Long boardId);

    List<BoardCommentResponse> findCommentByUserId(Long userId);

    Long saveReply(BoardCommentReplyWriteRequest request);

    void updateReply(BoardCommentReplyUpdateRequest request);

    void deleteReply(Long replyId, Long userId);

    List<BoardCommentReplyResponse> findReplyByCommentId(Long commentId);
}
