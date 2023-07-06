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

    @Query(value = "select board_comment_id, user_id, board_id, text, create_date, reply_cnt from board_comment where user_id =:user_id group by board_id", nativeQuery = true)
    Page<BoardComment> findDistinctBoardIdByUser(Pageable pageable, Long user_id);

    @Query("select count(*) from BoardComment b where b.board.boardId = :board_id")
    Long CountBoardComment(Long board_id);

    @Query(value = "select board_comment_id, user_id, board_id, text, create_date, reply_cnt from board_comment where user_id =:user_id group by board_id", nativeQuery = true)
    List<BoardComment> findByUserGroupByBoard(Long user_id);
}
