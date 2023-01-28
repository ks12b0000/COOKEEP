package teamproject.backend.like;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardLike;
import teamproject.backend.domain.User;

import java.util.List;
import java.util.Optional;

public interface LikeBoardRepository extends JpaRepository<BoardLike, Long> {
    Optional<BoardLike> findByBoardAndUser(Board board, User user);

    List<BoardLike> findByUser(User user);

    List<BoardLike> findByBoard(Board board); // 글 삭제 시 좋아요 일괄 삭제를 위함
}
