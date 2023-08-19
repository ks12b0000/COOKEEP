package teamproject.backend.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.BoardByUserResponse;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByCategory(Pageable pageable, FoodCategory category);

    List<Board> findByUser(User user);

    Page<Board> findByUserId(Pageable pageable, Long userId);

    List<Board> findTop5ByOrderByViewDesc();

    List<Board> findTop5ByOrderByLikedDesc();

    List<Board> findTop10ByOrderByViewDesc();

    List<Board> findTop10ByOrderByLikedDesc();

    @Transactional
    @Modifying
    @Query("update Board q set q.view = q.view + 1 where q.boardId = :boardId")
    int updateView(@Param("boardId") Long boardId);

    @Query("select boardId from Board")
    List<Long> findBoardIdAll();
}