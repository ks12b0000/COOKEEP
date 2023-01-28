package teamproject.backend.boardTag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;

import java.util.List;

@Repository
public interface BoardTagRepository extends JpaRepository<BoardTag, Long> {
    List<BoardTag> findByBoard(Board board);
    List<BoardTag> findByTag(Tag tag);
}
