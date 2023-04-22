package teamproject.backend.board;

import org.springframework.data.domain.Pageable;
import teamproject.backend.board.dto.*;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardResponseInDetailFormat findBoardById(Long boardId);

    BoardListResponseByCategory findBoardListByFoodCategoryName(Pageable pageable, String categoryName);

    void delete(Long userId, Long boardId);

    String updateLikeOfBoard(Long boardId, User user);

    void update(Long boardId, BoardWriteRequest boardWriteRequest);

    BoardListResponseAll findBoarListByAll(Pageable pageable);

    public List<BoardResponseInCardFormat> findBoarListByLiked();

    public List<BoardResponseInCardFormat> findBoarViewedByCommented();

    UserBoardResponseInListFormat findBoardListByUser(Pageable pageable, Long userId);

    CheckUserLikeBoard checkLiked(Long userId, Long BoardId);

    List<CheckUserLikeBoard> checkLikedList(Long userId,List<Long> boardIds);
}
