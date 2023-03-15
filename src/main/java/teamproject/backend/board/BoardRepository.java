package teamproject.backend.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardResponseInBannerFormat;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.domain.User;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByCategory(FoodCategory category, Sort sort);

    List<Board> findByUser_id(Long userId);

    List<Board> findByUser(User user);

    @Query("select new teamproject.backend.board.dto.BoardResponseInBannerFormat(b.boardId, b.title, b.thumbnail) from Board b where b.user.id = :userId")
    Page<BoardResponseInBannerFormat> findBannerByUserId(Pageable pageable, Long userId);

    List<Board> findTop5ByOrderByLikedDesc();

    List<Board> findTop5ByOrderByCommentedDesc();

    @Transactional
    @Modifying
    @Query("update Board q set q.view = q.view + 1 where q.boardId = :boardId")
    int updateView(Long boardId);

    @Query("select boardId from Board")
    List<Long> findBoardIdAll();
}