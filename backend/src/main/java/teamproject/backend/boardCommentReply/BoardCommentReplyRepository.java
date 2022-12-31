package teamproject.backend.boardCommentReply;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.BoardCommentReply;

import java.util.List;

public interface BoardCommentReplyRepository extends JpaRepository<BoardCommentReply, Long> {
    List<BoardCommentReply> findByBoardComment(BoardComment boardComment);
}
