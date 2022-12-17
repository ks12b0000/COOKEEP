package teamproject.backend.board;

import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    Long save(BoardWriteRequest boardWriteRequest);

    BoardReadResponse findById(Long board_id);
    List<BoardReadResponse> findByUserId(Long user_id);

    List<BoardReadResponse> findAll();

    List<BoardReadResponse> findByCategory(String category);

    void delete(Long user_id, Long board_id);

    void delete_err_thumbnail();

    String updateLikeOfBoard(Long board_id, User user);

    public void update(Long board_id, BoardWriteRequest boardWriteRequest);
}
