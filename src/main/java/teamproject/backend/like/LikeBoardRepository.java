package teamproject.backend.like;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardLike;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.LikeAndCommentByUserResponse;

import java.util.List;
import java.util.Optional;

public interface LikeBoardRepository extends JpaRepository<BoardLike, Long> {
    Optional<BoardLike> findByBoardAndUser(Board board, User user);

    @Query("select new teamproject.backend.mypage.dto.LikeAndCommentByUserResponse(d.board.boardId, d.board.title, d.board.commented) " +
            "from BoardLike d where d.user.id =:userId")
    Page<LikeAndCommentByUserResponse> findBoardByUserId(Pageable pageable, Long userId);

    List<BoardLike> findByBoard(Board board); // 글 삭제 시 좋아요 일괄 삭제를 위함

    boolean existsByBoardAndUser(Board board, User user);

}
