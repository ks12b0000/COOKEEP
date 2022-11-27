package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ValidationSequence;

import java.util.List;

@RestController
@RequiredArgsConstructor

public class BoardController {
    private final BoardService boardService;

    @PostMapping("/auth/board/write")
    public BaseResponse board_write(@Validated(ValidationSequence.class) @RequestBody BoardWriteRequest boardWriteRequest){
        boardService.save(boardWriteRequest);
        return new BaseResponse("성공적으로 글이 작성됐습니다.");
    }

    @GetMapping("/board/list")
    public BaseResponse<List<BoardReadResponse>> board_list(@RequestParam String category, @RequestParam int page){
        List<BoardReadResponse> pages = boardService.getBoards(category, page);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    @GetMapping("/board")
    public BaseResponse<BoardReadResponse> search_board(@RequestParam Long board_id){
        BoardReadResponse boardReadResponse = boardService.findById(board_id);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", boardReadResponse);
    }
}
