package teamproject.backend.board;

import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;

import java.util.List;

public interface BoardService {
    public Long save(BoardWriteRequest boardWriteRequest);

    public BoardReadResponse findById(Long board_id);

    public List<BoardReadResponse> getBoards(String category, int page);

}
