package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.boardComment.BoardCommentService;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.BoardCommentReplyService;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ValidationSequence;
import teamproject.backend.user.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final UserService userService;
    private final BoardCommentService boardCommentService;
    private final BoardCommentReplyService boardCommentReplyService;

    /**
     * 글 작성
     * [POST] /auth/board/write
     * @param boardWriteRequest
     * @return
     */
    @PostMapping("/auth/board/write")
    public BaseResponse boardWrite(@Validated(ValidationSequence.class) @RequestBody BoardWriteRequest boardWriteRequest){
        boardService.save(boardWriteRequest);
        return new BaseResponse("성공적으로 글이 작성됐습니다.");
    }

    @PatchMapping("/auth/board/{board_id}")
    public BaseResponse boardUpdate(@Validated(ValidationSequence.class) @RequestBody BoardWriteRequest boardWriteRequest, @PathVariable Long board_id){
        boardService.update(board_id, boardWriteRequest);
        return new BaseResponse("성공적으로 글이 수정됐습니다.");
    }

    /**
     * 카테고리 글 목록 조회
     * [GET] /board/list
     * @param category
     * @return
     */
    @GetMapping("/board/list")
    public BaseResponse<List<BoardReadResponse>> boardListByCategory(@RequestParam String category){
        List<BoardReadResponse> pages = boardService.findBoardReadResponseListByFoodCategoryName(category);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 회원 글 목록 조회
     * @param user_id
     * @return
     */
    @GetMapping("/board/list/{user_id}")
    public BaseResponse<List<BoardReadResponse>> boardListByUser(@PathVariable Long user_id){
        List<BoardReadResponse> pages = boardService.findBoardReadResponseListByUserId(user_id);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 글 단건 조회
     * [GET] /board
     * @param board_id
     * @return
     */
    @GetMapping("/board")
    public BaseResponse<BoardReadResponse> searchBoard(@RequestParam Long board_id){
        BoardReadResponse boardReadResponse = boardService.findBoardReadResponseByBoardId(board_id);
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

    /**
     * 글 삭제
     * [DELETE] /board
     * @param board_id
     * @param user_id
     * @return
     */
    @DeleteMapping("/auth/board")
    public BaseResponse deleteBoard(@RequestParam Long board_id, @RequestParam Long user_id){
        boardService.delete(user_id, board_id);
        return new BaseResponse<>("성공적으로 글을 삭제했습니다.");
    }

    /**
     * 댓글 작성
     * [POST] /board/comment
     * @param request
     * @return
     */
    @PostMapping("/board/comment")
    public BaseResponse saveComment(@RequestBody BoardCommentWriteRequest request){
        boardCommentService.save(request);
        return new BaseResponse("성공적으로 댓글이 작성되었습니다.");
    }

    /**
     * 댓글 수정
     * [PATCH] /board/comment
     * @param request
     * @return
     */
    @PatchMapping("/board/comment")
    public BaseResponse updateComment(@RequestBody BoardCommentUpdateRequest request){
        boardCommentService.update(request);
        return new BaseResponse("성공적으로 댓글을 수정하였습니다.");
    }

    /**
     * 댓글 삭제
     * [DELETE] /board/comment
     * @param comment_id
     * @param user_id
     * @return
     */
    @DeleteMapping("/board/comment")
    public BaseResponse deleteComment(@RequestParam Long comment_id, Long user_id){
        boardCommentService.delete(comment_id, user_id);
        return new BaseResponse("성공적으로 댓글을 삭제했습니다.");
    }

    /**
     * 댓글 조회
     * [GET] /board/comment/list
     * @param board_id
     * @return
     */
    @GetMapping("/board/comment/list")
    public BaseResponse listBoardComments(@RequestParam Long board_id){
        List<BoardCommentResponse> comments = boardCommentService.findCommentListByBoard(board_id);
        return new BaseResponse("성공적으로 글의 댓글들을 가져왔습니다.", comments);
    }

    @PostMapping("/board/comment/reply")
    public BaseResponse saveReply(@RequestBody BoardCommentReplyWriteRequest request){
        boardCommentReplyService.save(request);
        return new BaseResponse("성공적으로 대댓글을 작성했습니다.");
    }

    @PatchMapping("/board/comment/reply")
    public BaseResponse updateReply(@RequestBody BoardCommentReplyUpdateRequest request){
        boardCommentReplyService.update(request);
        return new BaseResponse("성공적으로 대댓글을 수정했습니다.");
    }

    @DeleteMapping("/board/comment/reply")
    public BaseResponse deleteReply(@RequestParam Long reply_id, @RequestParam Long user_id){
        boardCommentReplyService.delete(reply_id, user_id);
        return new BaseResponse("성공적으로 대댓글을 삭제했습니다.");
    }

    @GetMapping("/board/comment/reply/list")
    public BaseResponse<List<BoardCommentReplyResponse>> listBoardReplies(@RequestParam Long comment_id){
        List<BoardCommentReplyResponse> list = boardCommentReplyService.findReplyByCommentId(comment_id);
        return new BaseResponse("성공적으로 대댓글 목록을 조회했습니다.", list);
    }

    @GetMapping("/board/list/best/liked")
    public BaseResponse<List<BoardReadResponse>> boardListOrderByLiked(){
        List<BoardReadResponse> pages = boardService.findBoardReadResponseOrderByLikedDesc(10);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    @GetMapping("/board/list/best/commented")
    public BaseResponse<List<BoardReadResponse>> boardListOrderByCommented(){
        List<BoardReadResponse> pages = boardService.findBoardReadResponseOrderByCommentedDesc(10);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }
}
