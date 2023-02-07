package teamproject.backend.board;

import teamproject.backend.board.dto.BoardResponseInDetailFormat;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardResponseInDetailFormat findBoardReadResponseByBoardId(Long boardId);

    Board findBoardByBoardId(Long boardId);

    List<BoardResponseInDetailFormat> findBoardReadResponseListByUserId(Long userId);

    List<BoardResponseInDetailFormat> findBoardReadResponseListByFoodCategoryName(String categoryName);

    List<BoardResponseInDetailFormat> findBoardReadResponseOrderByCommentedDesc(int numberOfBoard);

    List<BoardResponseInDetailFormat> findBoardReadResponseOrderByLikedDesc(int numberOfBoard);

    void delete(Long userId, Long boardId);

    String updateLikeOfBoard(Long boardId, User user);

    void update(Long boardId, BoardWriteRequest boardWriteRequest);
}
