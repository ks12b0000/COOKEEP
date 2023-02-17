package teamproject.backend.board;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.domain.User;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByCategory(FoodCategory category, Sort sort);

    List<Board> findByUser_id(Long userId);

    List<Board> findByUser(User user);

    List<Board> findTop5ByOrderByLikedDesc();

    List<Board> findTop5ByOrderByCommentedDesc();

    @Transactional
    @Modifying
    @Query("update Board q set q.view = q.view + 1 where q.boardId = :boardId")
    int updateView(Long boardId);
}