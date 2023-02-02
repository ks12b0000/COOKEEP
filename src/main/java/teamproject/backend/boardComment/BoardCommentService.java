package teamproject.backend.boardComment;

import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardCommentService {
    Long save(BoardCommentWriteRequest writeRequest);

    BoardComment getCommentBy(Long commentId);

    void update(BoardCommentUpdateRequest updateRequest);

    void delete(Long commentId, Long userId);

    List<BoardCommentResponse> findCommentListByBoard(Long boardId);

    List<BoardCommentResponse> findCommentListByUser(Long userId);
}
