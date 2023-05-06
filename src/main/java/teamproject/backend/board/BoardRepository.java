package teamproject.backend.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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
    @Query("select new teamproject.backend.board.dto.BoardResponseInCardFormat(b.boardId, b.category.categoryName, " +
            "b.title, b.user.nickname, b.createDate, b.thumbnail, b.commented, b.liked, b.view) " +
            "from Board b ")
    Page<BoardResponseInCardFormat> findCardByAll(Pageable pageable);
    List<Board> findByUser(User user);

    @Query("select new teamproject.backend.mypage.dto.BoardByUserResponse(b.boardId, b.title, b.commented) from Board b where b.user.id =:userId")
    Page<BoardByUserResponse> findBoardByUserId(Pageable pageable, Long userId);

    @Query("select new teamproject.backend.mypage.dto.BoardByUserResponse(b.boardId, b.title, b.commented) from Board b where b.user.id = :userId")
    Page<BoardByUserResponse> findBannerByUserId(Pageable pageable, Long userId);

    List<Board> findTop5ByOrderByLikedDesc();

    List<Board> findTop5ByOrderByViewDesc();

    List<Board> findTop10ByOrderByLikedDesc();

    List<Board> findTop10ByOrderByViewDesc();

    @Transactional
    @Modifying
    @Query("update Board q set q.view = q.view + 1 where q.boardId = :boardId")
    int updateView(Long boardId);

    @Query("select boardId from Board")
    List<Long> findBoardIdAll();
}