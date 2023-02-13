package teamproject.backend.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.domain.User;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByCategory(FoodCategory category, Sort sort);

    List<Board> findByUser_id(Long userId);

    List<Board> findByUser(User user);
}