package teamproject.backend.board;

import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.board.dto.BoardResponseInDetailFormat;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardResponseInDetailFormat findBoardById(Long boardId);

    List<BoardResponseInDetailFormat> findBoardListByUserId(Long userId);

    List<BoardResponseInDetailFormat> findBoardListByFoodCategoryName(String categoryName);

    List<BoardResponseInCardFormat> findBoardListOrderByCommentedDesc(int numberOfBoard);

    List<BoardResponseInCardFormat> findBoardListOrderByLikedDesc(int numberOfBoard);

    void delete(Long userId, Long boardId);

    String updateLikeOfBoard(Long boardId, User user);

    void update(Long boardId, BoardWriteRequest boardWriteRequest);

    List<BoardResponseInCardFormat> findBoarListByAll();

    List<BoardResponseInCardFormat> findBoarListOrderByLikedDescAll();

    List<BoardResponseInCardFormat> findBoarListOrderByCommentedDescAll();
}
