package teamproject.backend.boardComment;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.BoardComment;

import java.util.List;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
    List<BoardComment> findByBoard_id(Long board_id);

    List<BoardComment> findByUser_id(Long user_id);
}
