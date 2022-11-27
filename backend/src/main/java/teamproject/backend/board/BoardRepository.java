package teamproject.backend.board;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.FoodCategory;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByCategory(FoodCategory foodCategory);
}
