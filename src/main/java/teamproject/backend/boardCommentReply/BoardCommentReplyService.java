package teamproject.backend.boardCommentReply;

import org.springframework.data.domain.Pageable;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyListResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.BoardComment;

public interface BoardCommentReplyService {
    Long save(BoardCommentReplyWriteRequest request);

    void update(BoardCommentReplyUpdateRequest request);

    void delete(Long replyId, Long userId);

    void deleteAllReplyOf(BoardComment comment);

    BoardCommentReplyListResponse findReplyByCommentId(Pageable pageable, Long commentId);
}
