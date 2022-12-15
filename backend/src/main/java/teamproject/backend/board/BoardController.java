package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ValidationSequence;
import teamproject.backend.user.UserService;
import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final UserService userService;

    @PostMapping("/auth/board/write")
    public BaseResponse board_write(@Validated(ValidationSequence.class) @RequestBody BoardWriteRequest boardWriteRequest){
        boardService.save(boardWriteRequest);
        return new BaseResponse("성공적으로 글이 작성됐습니다.");
    }

    @GetMapping("/board/list")
    public BaseResponse<List<BoardReadResponse>> board_list(@RequestParam String category){
        List<BoardReadResponse> pages = boardService.getBoards(category);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    @GetMapping("/board")
    public BaseResponse<BoardReadResponse> search_board(@RequestParam Long board_id){
        BoardReadResponse boardReadResponse = boardService.findById(board_id);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", boardReadResponse);
    }

    /**
     * 좋아요 기능
     * [POST] /auth/board/like/{board_id}
     * @param board_id
     * @param request
     * @return
     */
    @PostMapping("/auth/board/like/{board_id}")
    public BaseResponse likeBoard(@PathVariable Long board_id, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        User user = userService.checkUserHasLogin(cookies);
        return new BaseResponse("좋아요 성공.", boardService.updateLikeOfBoard(board_id, user));
    }
}
