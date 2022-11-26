package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.dto.BoardDTO;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;
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
        System.out.println(boardDTO.getCategory());
        System.out.println(boardDTO.getTitle());
        System.out.println(boardDTO.getText());
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
    public List<BoardDTO> board_list(@RequestParam int page){
        //페이지 값 받아오기 -> 추후 검증 필요

        //페이지에 맞게 8개 데이터 뽑아오기
        List<BoardDTO> pages = boardService.getBoards(page);
        return pages;
    }

    @CrossOrigin
    @GetMapping("/board/test")
    public int test(@RequestParam int code){
        return code;
    }
}
