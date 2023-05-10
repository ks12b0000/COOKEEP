package teamproject.backend.boardComment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.LikeAndCommentByUserResponse;

import java.util.List;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
    @Query("select new teamproject.backend.boardComment.dto.BoardCommentResponse(b.boardCommentId, b.user.nickname, b.user.id, b.user.imageURL, b.createDate, b.text, b.replyCnt) from BoardComment b where b.board =:board ORDER BY b.createDate desc")
    Page<BoardCommentResponse> findByBoardOrderByCreateDateDesc(Pageable pageable, Board board);
    List<BoardComment> findByBoard(Board board);
    List<BoardComment> findByUser(User user);
    @Query("select new teamproject.backend.mypage.dto.LikeAndCommentByUserResponse(d.board.boardId, d.board.title, d.board.commented) " +
            "from BoardComment d where d.user =:user group by d.board")
    Page<LikeAndCommentByUserResponse> findByUserDistinctBoard(Pageable pageable, User user);
}
