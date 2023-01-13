package teamproject.backend.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardLike;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.domain.User;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByCategory(FoodCategory category);

    List<Board> findByUser_id(Long userId);

    List<Board> findByUser(User user);

    List<Board> findAllOrderByCommentedDesc();

    List<Board> findAllOrderByLikedDesc();
}