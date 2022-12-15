package teamproject.backend.board;

import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.LoginResponse;

import java.util.List;

public interface BoardService {
    public Long save(BoardWriteRequest boardWriteRequest);

    public BoardReadResponse findById(Long board_id);

    public List<BoardReadResponse> getBoards(String category);

    public void delete(Long user_id, Long board_id);

    public String updateLikeOfBoard(Long board_id, User user);

}
