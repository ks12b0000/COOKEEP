package teamproject.backend.boardCommentReply;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.BoardCommentReply;

import java.util.List;

public interface BoardCommentReplyRepository extends JpaRepository<BoardCommentReply, Long> {
    @Query("select new teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse(b.boardCommentReplyId, b.user.nickname, b.user.id, b.user.imageURL, b.createDate, b.text) from BoardCommentReply b where b.boardComment =:boardComment ORDER BY b.createDate DESC")
    Page<BoardCommentReplyResponse> findByBoardComment(Pageable pageable, BoardComment boardComment);
    List<BoardCommentReply>  findAllByBoardComment(BoardComment boardComment);
}
