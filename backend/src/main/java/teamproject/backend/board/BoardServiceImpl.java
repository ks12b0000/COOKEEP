package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;
import teamproject.backend.board.dto.BoardDTO;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;

    @Override
    public Long save(Board board){
        boardRepository.save(board);
        return board.getBoard_id();
    }

    @Override
    public BoardDTO findById(Long id){
        Optional<Board> board = boardRepository.findById(id);
        return changeDTO(board.get());
    }

    @Override
    public List<BoardDTO> getBoards(int page) {
        int start = 1 + page * 8;
        int end = (int) Math.min((start + 7), boardRepository.count());
        List<Board> pages = new ArrayList<>(boardRepository.findAll().subList(start, end));

        List<BoardDTO> boardDTOs = new ArrayList<>();
        for(Board board : pages){
            boardDTOs.add(changeDTO(board));
        }

        return boardDTOs;
    }

    @Override
    public long getCount() {
        return boardRepository.count();
    }

    private BoardDTO changeDTO(Board board){
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setText(board.getText());
        boardDTO.setTitle(board.getTitle());
        boardDTO.setCategory(board.getCategory());
        boardDTO.setUser_name(board.getUser().getUsername());
        boardDTO.setCreate_date(board.getCreateDate());
        boardDTO.setBoard_id(board.getBoard_id());
        return boardDTO;
    }
}
