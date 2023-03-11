package teamproject.backend.board;

import org.springframework.data.domain.Sort;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.board.dto.BoardResponseInDetailFormat;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.board.dto.UserBoardResponseInListFormat;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardResponseInDetailFormat findBoardById(Long boardId);

    List<BoardResponseInDetailFormat> findBoardListByUserId(Long userId);

    List<BoardResponseInCardFormat> findBoardListByFoodCategoryName(String categoryName, Sort sort);

    void delete(Long userId, Long boardId);

    String updateLikeOfBoard(Long boardId, User user);

    void update(Long boardId, BoardWriteRequest boardWriteRequest);

    List<BoardResponseInCardFormat> findBoarListByAll(Sort sort);

    public List<BoardResponseInCardFormat> findBoarListByLiked();

    public List<BoardResponseInCardFormat> findBoarListByCommented();

    UserBoardResponseInListFormat findBoardListByUser(Long userId);
}
