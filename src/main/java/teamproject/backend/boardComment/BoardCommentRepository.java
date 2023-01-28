package teamproject.backend.boardComment;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
    List<BoardComment> findByBoard(Board board);

    List<BoardComment> findByUser(User user);
}
