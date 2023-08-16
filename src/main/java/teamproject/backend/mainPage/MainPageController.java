package teamproject.backend.mainPage;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.BoardService;
import teamproject.backend.board.dto.BoardListResponseAll;
import teamproject.backend.board.dto.BoardListResponseByCategory;
import teamproject.backend.board.dto.BoardResponseInBannerFormat;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.mainPage.dto.*;
import teamproject.backend.mypage.dto.GetNotificationResponse;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.utils.recommend.RecommendService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "MainPage", description = "MainPage API")
public class MainPageController {

    private final MainPageService mainPageService;
    private final BoardService boardService;

    @Qualifier("weeklyBoard")
    private final RecommendService weeklyRecommendService;


    /**
     * 제목으로 검색 목록
     * [GET] /main/search/list?keyword=&page= 최신순 (기본값)
     * [GET] /main/search/list?keyword=&sort=liked,desc&page= 좋아요순
     * [GET] /main/search/list?keyword=&sort=commented,desc&page= 댓글순
     * @param keyword
     * @return
     */
    @Operation(summary = "제목으로 검색 API", description = "keyword를 입력해서 관련된 제목 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "검색 결과를 가져오는데 성공했습니다.")
    })
    @ApiImplicitParam(name = "keyword", value = "제목 검색 keyword", required = true, dataTypeClass = String.class)
    @Tag(name = "MainPage")
    @GetMapping("/main/search/list")
    public BaseResponse searchList(@RequestParam String keyword, @PageableDefault(size = 20, sort = "createDate", direction = Sort.Direction.DESC) Pageable pageable) {
        BoardListResponseAll getSearchByResponse = mainPageService.searchList(keyword, pageable);

        return new BaseResponse("검색 결과를 가져오는데 성공했습니다.", getSearchByResponse);
    }


    /**
     * 태그로 검색 목록
     * [GET] /main/search/tag/list?keyword=&page= 최신순 (기본값)
     * [GET] /main/search/tag/list?keyword=&sort=board.liked,desc&page= 좋아요순
     * [GET] /main/search/tag/list?keyword=&sort=board.commented,desc&page= 댓글순
     * @param keyword
     * @return
     */
    @Operation(summary = "태그로 검색 API", description = "keyword를 입력해서 관련된 태그 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "검색 결과를 가져오는데 성공했습니다.")
    })
    @ApiImplicitParam(name = "keyword", value = "태그 검색 keyword", required = true, dataTypeClass = String.class)
    @Tag(name = "MainPage")
    @GetMapping("/main/search/tag/list")
    public BaseResponse searchTagList(@RequestParam String keyword, @PageableDefault(size = 20, sort = "board.createDate", direction = Sort.Direction.DESC) Pageable pageable) {

        SearchListResponseAll getSearchByResponse = mainPageService.searchTagList(keyword, pageable);

        return new BaseResponse("검색 결과를 가져오는데 성공했습니다.", getSearchByResponse);
    }

    /**
     * Top10 태그 사용순 리스트 가져오기
     * [GET] /main/top10/tag/list
     * @return
     */
    @Operation(summary = "Top10 태그 사용순 목록 API", description = "Top10 태그 사용순 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "Top10 태그 사용순 리스트를 불러오는데 성공했습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/top10/tag/list")
    public BaseResponse top10TagList() {
        GetTop10TagList tags = mainPageService.top10TagList();

        return new BaseResponse("Top10 태그 사용순 리스트를 불러오는데 성공했습니다.", tags);
    }

    /**
     * Top10 인기 검색어 리스트 가져오기
     * [GET] /main/top10/search/list
     * @return
     */
    @Operation(summary = "Top10 인기 검색어 목록 API", description = "Top10 인기 검색어 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "Top10 인기 검색어 리스트를 불러오는데 성공했습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/top10/search/list")
    public BaseResponse top10SearchList() {
        GetTop10SearchList searchList = mainPageService.top10SearchList();

        return new BaseResponse("Top10 인기 검색어 리스트를 불러오는데 성공했습니다.", searchList);
    }

    /**
     * 좋아요순 5개 가져오기
     * [GET] /main/best/liked/list
     * @return
     */
    @Operation(summary = "Top5 좋아요순 게시글 목록 API", description = "Top5 좋아요순 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 가져왔습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/best/liked/list")
    public BaseResponse boardListOrderByLiked() {
        List<BoardResponseInCardFormat> pages = boardService.findBoarListByLiked();
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 조회순 5개 가져오기
     * [GET] /main/best/viewed/list
     * @return
     */
    @Operation(summary = "Top5 조회순 게시글 목록 API", description = "Top5 조회순 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 가져왔습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/best/viewed/list")
    public BaseResponse boardListOrderByCommented(){
        List<BoardResponseInCardFormat> pages = boardService.findBoarViewedByCommented();
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 좋아요순 10개 가져오기
     * [GET] /main/best/liked/list/more
     * @return
     */
    @Operation(summary = "Top10 좋아요순 게시글 목록 API", description = "Top10 좋아요순 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 가져왔습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/best/liked/list/more")
    public BaseResponse boardListOrderByLikedMore() {
        List<BoardResponseInCardFormat> pages = boardService.findBoarListByLikedMore();
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 조회순 10개 가져오기
     * [GET] /main/best/viewed/list/more
     * @return
     */
    @Operation(summary = "Top10 조회순 게시글 목록 API", description = "Top10 조회순 게시글 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 글을 가져왔습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/best/viewed/list/more")
    public BaseResponse boardListOrderByCommentedMore(){
        List<BoardResponseInCardFormat> pages = boardService.findBoarViewedByCommentedMore();
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    @Operation(summary = "메인 배너 목록 API", description = "메인 배너 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "추천 목록을 불러왔습니다.")
    })
    @Tag(name = "MainPage")
    @GetMapping("/main/recommend/board/weekly/list")
    public BaseResponse weeklyBoardRecommend(){
        List<BoardResponseInBannerFormat> list = weeklyRecommendService.getRecommend();
        return new BaseResponse("추천 목록을 불러왔습니다.", list);
    }
        
    /**
     * 검색어 자동완성 기능
     * [GET] /main/auto/search/list?keyword=
     * @param keyword
     * @return
     */
    @Operation(summary = "검색어 자동완성 API", description = "keyword를 활용해서 검색어 자동완성 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "검색어 자동완성 리스트를 불러오는데 성공했습니다.")
    })
    @ApiImplicitParam(name = "keyword", value = "검색어 자동완성 keyword", required = true, dataTypeClass = String.class)
    @Tag(name = "MainPage")
    @GetMapping("/main/auto/search/list")
    public BaseResponse autoSearchList(@RequestParam String keyword) {
        GetAutoSearchList getAutoSearchList = mainPageService.autoSearchList(keyword);

        return new BaseResponse("검색어 자동완성 리스트를 불러오는데 성공했습니다.", getAutoSearchList);
    }

    /**
     * 태그 자동완성 기능
     * [GET] /main/auto/tag/search/list?keyword=
     * @param keyword
     * @return
     */
    @Operation(summary = "태그 자동완성 API", description = "keyword를 활용해서 태그 자동완성 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "태그 자동완성 리스트를 불러오는데 성공했습니다.")
    })
    @ApiImplicitParam(name = "keyword", value = "태그 자동완성 keyword", required = true, dataTypeClass = String.class)
    @Tag(name = "MainPage")
    @GetMapping("/main/auto/tag/search/list")
    public BaseResponse autoTagSearchList(@RequestParam String keyword) {
        GetAutoSearchList getAutoTagSearchList = mainPageService.autoTagSearchList(keyword);

        return new BaseResponse("태그 자동완성 리스트를 불러오는데 성공했습니다.", getAutoTagSearchList);
    }
}