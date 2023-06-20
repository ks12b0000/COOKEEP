package teamproject.backend.board;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.dto.*;
import teamproject.backend.boardComment.BoardCommentService;
import teamproject.backend.boardComment.dto.BoardCommentListResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.BoardCommentReplyService;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyListResponse;
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
@Tag(name = "Board", description = "Board API")
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
    @Operation(summary = "글 작성 API", description = "카테고리, 제목, 내용, 유저Id, 썸네일, 태그를 입력해서 글을 작성한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글이 작성됐습니다.")
    })
    @Tag(name = "Board")
    @PostMapping("/auth/board/write")
    public BaseResponse boardWrite(@Validated(ValidationSequence.class) @RequestBody BoardWriteRequest boardWriteRequest){
        boardService.save(boardWriteRequest);
        return new BaseResponse("성공적으로 글이 작성됐습니다.");
    }

    @Operation(summary = "글 수정 API", description = "카테고리, 제목, 내용, 유저Id, 썸네일, 태그를 수정해서 글을 수정한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글이 수정됐습니다.")
    })
    @Tag(name = "Board")
    @PatchMapping("/auth/board/{board_id}")
    public BaseResponse boardUpdate(@Validated(ValidationSequence.class) @RequestBody BoardWriteRequest boardWriteRequest, @PathVariable Long board_id){
        boardService.update(board_id, boardWriteRequest);
        return new BaseResponse("성공적으로 글이 수정됐습니다.");
    }

    /**
     * 카테고리 글 목록 조회
     * [GET] /board/list?category= 최신순 (기본값)
     * [GET] /board/list?category=&sort=liked,desc 좋아요순
     * [GET] /board/list?category=&sort=commented,desc 댓글순
     * @param category
     * @return
     */
    @Operation(summary = "카테고리별 글 목록 조회 API", description = "카테고리를 입력해서 카테고리별 글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 가져왔습니다.")
    })
    @ApiImplicitParam(name = "category", value = "글 목록 불러올 카테고리명", required = true, dataTypeClass = String.class)
    @Tag(name = "Board")
    @GetMapping("/board/list")
    public BaseResponse boardListByCategory(@PageableDefault(size = 20, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable, @RequestParam String category){
        BoardListResponseByCategory pages = boardService.findBoardListByFoodCategoryName(pageable, category);
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 글 단건 조회
     * [GET] /board
     * @param board_id
     * @return
     */
    @Operation(summary = "글 단건 조회 API", description = "BoardId로 글을 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 가져왔습니다.")
    })
    @ApiImplicitParam(name = "board_id", value = "불러올 글 인덱스", required = true, dataTypeClass = Long.class)
    @Tag(name = "Board")
    @GetMapping("/board")
    public BaseResponse<BoardResponseInDetailFormat> searchBoard(@RequestParam Long board_id){
        BoardResponseInDetailFormat boardReadResponse = boardService.findBoardById(board_id);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", boardReadResponse);
    }

    /**
     * 좋아요 기능
     * [POST] /auth/board/like/{board_id}
     * @param board_id
     * @param request
     * @return
     */
    @Operation(summary = "좋아요 API", description = "Cookie로 User 조회 후 BoardId로 글을 좋아요 누른다.", responses = {
            @ApiResponse(responseCode = "200", description = "좋아요 성공.")
    })
    @Tag(name = "Board")
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
    @Operation(summary = "글 삭제 API", description = "UserId, BoardId로 글을 삭제한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 삭제했습니다.")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "board_id", value = "삭제할 글 인덱스", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "user_id", value = "글을 삭제하는 유저 인덱스", required = true, dataTypeClass = Long.class)
    })
    @Tag(name = "Board")
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
    @Operation(summary = "댓글 작성 API", description = "BoardId, text, UserId로 댓글을 작성한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 댓글이 작성되었습니다.")
    })
    @Tag(name = "Board")
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
    @Operation(summary = "댓글 수정 API", description = "BoardCommentId, text, UserId로 댓글을 작성한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 댓글을 수정하였습니다.")
    })
    @Tag(name = "Board")
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
    @Operation(summary = "댓글 삭제 API", description = "BoardCommentId, UserId로 댓글을 삭제한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 댓글을 삭제했습니다.")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "comment_id", value = "삭제할 댓글 인덱스", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "user_id", value = "댓글을 삭제하는 유저 인덱스", required = true, dataTypeClass = Long.class)
    })
    @Tag(name = "Board")
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
    @Operation(summary = "댓글 조회 API", description = "BoardId로 댓글을 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글의 댓글들을 가져왔습니다.")
    })
    @ApiImplicitParam(name = "board_id", value = "댓글 목록을 조회할 글 인덱스", required = true, dataTypeClass = Long.class)
    @Tag(name = "Board")
    @GetMapping("/board/comment/list")
    public BaseResponse listBoardComments(@PageableDefault(size = 10) Pageable pageable, @RequestParam Long board_id){
        BoardCommentListResponse comments = boardCommentService.findCommentListByBoard(pageable, board_id);
        return new BaseResponse("성공적으로 글의 댓글들을 가져왔습니다.", comments);
    }

    @Operation(summary = "대댓글 작성 API", description = "CommentId, text, UserId로 대댓글을 작성한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 대댓글을 작성했습니다.")
    })
    @Tag(name = "Board")
    @PostMapping("/board/comment/reply")
    public BaseResponse saveReply(@RequestBody BoardCommentReplyWriteRequest request){
        boardCommentReplyService.save(request);
        return new BaseResponse("성공적으로 대댓글을 작성했습니다.");
    }

    @Operation(summary = "대댓글 수정 API", description = "ReplyId, text, UserId로 대댓글을 수정한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 대댓글을 수정했습니다.")
    })
    @Tag(name = "Board")
    @PatchMapping("/board/comment/reply")
    public BaseResponse updateReply(@RequestBody BoardCommentReplyUpdateRequest request){
        boardCommentReplyService.update(request);
        return new BaseResponse("성공적으로 대댓글을 수정했습니다.");
    }

    @Operation(summary = "대댓글 삭제 API", description = "ReplyId, UserId로 대댓글을 삭제한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 대댓글을 삭제했습니다.")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "reply_id", value = "삭제할 대댓글 인덱스", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "user_id", value = "글을 삭제하는 유저 인덱스", required = true, dataTypeClass = Long.class)
    })
    @Tag(name = "Board")
    @DeleteMapping("/board/comment/reply")
    public BaseResponse deleteReply(@RequestParam Long reply_id, @RequestParam Long user_id){
        boardCommentReplyService.delete(reply_id, user_id);
        return new BaseResponse("성공적으로 대댓글을 삭제했습니다.");
    }

    @Operation(summary = "대댓글 목록 조회 API", description = "CommentId로 대댓글 목록을 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 대댓글 목록을 조회했습니다.")
    })
    @ApiImplicitParam(name = "comment_id", value = "대댓글 목록을 조회할 댓글 인덱스", required = true, dataTypeClass = Long.class)
    @Tag(name = "Board")
    @GetMapping("/board/comment/reply/list")
    public BaseResponse listBoardReplies(@PageableDefault(size = 10) Pageable pageable, @RequestParam Long comment_id){
        BoardCommentReplyListResponse list = boardCommentReplyService.findReplyByCommentId(pageable, comment_id);
        return new BaseResponse("성공적으로 대댓글 목록을 조회했습니다.", list);
    }

    /**
     * 게시글 전체 리스트 (정렬)
     * [GET] /board/all/list 최신순 (기본값)
     * [GET] /board/all/list?sort=liked,desc 좋아요순
     * [GET] /board/all/list?sort=commented,desc 댓글순
     * @return
     */
    @Operation(summary = "전체 글 목록 조회 API", description = "전체 글 목록을 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 전체 게시글 목록을 조회했습니다.")
    })
    @Tag(name = "Board")
    @GetMapping("/board/all/list")
    public BaseResponse findBoarListByAll(@PageableDefault(size = 20, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable) {
        BoardListResponseAll boarListByAll = boardService.findBoarListByAll(pageable);

        return new BaseResponse("성공적으로 전체 게시글 목록을 조회했습니다.", boarListByAll);
    }

    @Operation(summary = "유저 글 목록 조회 API", description = "UserId로 유저 글 목록을 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 유저 글 목록을 불러왔습니다.")
    })
    @Tag(name = "Board")
    @GetMapping("/board/{userId}/list")
    public BaseResponse findBoardListByUser(@PathVariable Long userId, @PageableDefault(size = 8) Pageable pageable){
        UserBoardResponseInListFormat listFormat = boardService.findBoardListByUser(pageable, userId);
        return new BaseResponse("성공적으로 유저 글 목록을 불러왔습니다.", listFormat);
    }

    @Operation(summary = "유저 좋아요 여부 조회 API", description = "UserId, BoardId로 유저 좋아요 여부를 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "유저 좋아요 여부를 조회했습니다.")
    })
    @Tag(name = "Board")
    @GetMapping("/board/{boardId}/like/{userId}")
    public BaseResponse checkLiked(@PathVariable Long boardId, @PathVariable Long userId){
        CheckUserLikeBoard check = boardService.checkLiked(userId, boardId);
        return new BaseResponse("유저 좋아요 여부를 조회했습니다.", check);
    }

    @Operation(summary = "유저 좋아요 여부 리스트로 조회 API", description = "UserId, BoardIds로 유저 좋아요 여부를 여러 개 조회한다.", responses = {
            @ApiResponse(responseCode = "200", description = "유저 좋아요 여부를 조회했습니다.")
    })
    @ApiImplicitParam(name = "boardIds", value = "좋아요 여부를 조회할 boardIds", required = true, dataTypeClass = List.class)
    @Tag(name = "Board")
    @GetMapping("/like/{userId}/board")
    public BaseResponse checkLikedList(@PathVariable Long userId, @RequestParam List<Long> boardIds){
        List<CheckUserLikeBoard> check = boardService.checkLikedList(userId, boardIds);
        return new BaseResponse("유저 좋아요 여부를 조회했습니다.", check);
    }
}
