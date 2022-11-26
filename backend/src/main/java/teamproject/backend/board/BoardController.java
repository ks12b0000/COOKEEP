package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.dto.BoardDTO;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.user.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor

public class BoardController {

    private final UserRepository userRepository;
    private final BoardService boardService;

    @CrossOrigin
    @PostMapping("/board/write")
    public BaseResponse board_write(BoardDTO boardDTO){
        if(boardDTO.getTitle().length() < 5) throw new BaseException(BaseExceptionStatus.SHORT_TITLE_LENGTH);
        if(boardDTO.getText().length() < 5) throw new BaseException(BaseExceptionStatus.SHORT_TEXT_LENGTH);

        //유저 검증
        /*Optional<User> user = userRepository.findById(user_id);
        if(user == null){
            return new BaseResponse("잘못된 접근입니다.(사유 : 유저 인식 불가)"); // -> 추후에 관련 예외 제작 필요
        }*/

        //임시 User 생성(추후 삭제)
        User user = userRepository.findById(1L).get();
        //글 작성
        Board board = new Board(boardDTO, user);
        boardService.save(board);

        //반환
        return new BaseResponse("성공적으로 글이 작성됐습니다.");
    }

    @CrossOrigin
    @GetMapping("/board/list")
    public BaseResponse<List<BoardDTO>> board_list(@RequestParam int page){
        //페이지 값 받아오기 -> 추후 검증 필요
        int count = (int) boardService.getCount();
        if(page * 8 > count) throw new BaseException(BaseExceptionStatus.EXCEED_PAGE_NUMBER);
        //페이지에 맞게 8개 데이터 뽑아오기
        List<BoardDTO> pages = boardService.getBoards(page);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    @CrossOrigin
    @GetMapping("/board")
    public BaseResponse<BoardDTO> search_board(@RequestParam Long id){
        BoardDTO boardDTO = boardService.findById(id);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", boardDTO);
    }
}
