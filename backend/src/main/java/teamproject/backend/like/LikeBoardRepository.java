package teamproject.backend.like;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardLike;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.LoginResponse;

import java.util.Optional;

public interface LikeBoardRepository extends JpaRepository<BoardLike, Long> {
    Optional<BoardLike> findByBoardAndUser(Board board, User user);
}
