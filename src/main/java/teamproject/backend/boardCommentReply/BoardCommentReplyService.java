package teamproject.backend.boardCommentReply;

import org.springframework.stereotype.Service;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.BoardComment;

import java.util.List;

public interface BoardCommentReplyService {
    Long save(BoardCommentReplyWriteRequest request);

    void update(BoardCommentReplyUpdateRequest request);

    void delete(Long replyId, Long userId);

    void deleteAllReplyOf(BoardComment comment);

    List<BoardCommentReplyResponse> findReplyByCommentId(Long commentId);
}
