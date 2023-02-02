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

    BoardReadResponse findBoardReadResponseByBoardId(Long boardId);

    Board findBoardByBoardId(Long boardId);

    List<BoardReadResponse> findBoardReadResponseListByUserId(Long userId);

    List<BoardReadResponse> findBoardReadResponseListByFoodCategoryName(String categoryName);

    List<BoardReadResponse> findBoardReadResponseOrderByCommentedDesc(int numberOfBoard);

    List<BoardReadResponse> findBoardReadResponseOrderByLikedDesc(int numberOfBoard);

    void delete(Long userId, Long boardId);

    String updateLikeOfBoard(Long boardId, Long user_id);

    void update(Long boardId, BoardWriteRequest boardWriteRequest);
}
