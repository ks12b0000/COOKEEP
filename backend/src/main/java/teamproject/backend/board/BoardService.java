package teamproject.backend.board;

import teamproject.backend.board.dto.BoardDTO;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.util.List;

public interface BoardService {
    public Long save(Board board);

    public Board findById(Long id);

    public List<BoardDTO> getBoards(int page);
}
