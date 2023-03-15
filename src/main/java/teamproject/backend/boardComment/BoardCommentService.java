package teamproject.backend.boardComment;

import org.springframework.data.domain.Pageable;
import teamproject.backend.boardComment.dto.BoardCommentListResponse;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.domain.BoardComment;

import java.util.List;

public interface BoardCommentService {
    Long save(BoardCommentWriteRequest writeRequest);

    BoardComment getCommentBy(Long commentId);

    void update(BoardCommentUpdateRequest updateRequest);

    void delete(Long commentId, Long userId);

    BoardCommentListResponse findCommentListByBoard(Pageable pageable, Long boardId);

    List<BoardCommentResponse> findCommentListByUser(Long userId);
}
