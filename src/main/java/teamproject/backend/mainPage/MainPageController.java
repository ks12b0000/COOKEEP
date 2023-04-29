package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.board.BoardService;
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
public class MainPageController {

    private final MainPageService mainPageService;
    private final BoardService boardService;

    @Qualifier("weeklyBoard")
    private final RecommendService weeklyRecommendService;


    /**
     * 제목으로 검색 목록
     * [GET] /main/search/list?keyword=
     * @param keyword
     * @return
     */
    @GetMapping("/main/search/list")
    public BaseResponse searchList(@RequestParam String keyword) {

        List<BoardResponseInCardFormat> getSearchByResponse = mainPageService.searchList(keyword);

        return new BaseResponse("검색 결과를 가져오는데 성공했습니다.", getSearchByResponse);
    }


    /**
     * 태그로 검색 목록
     * [GET] /main/search/tag/list?keyword=
     * @param keyword
     * @return
     */
    @GetMapping("/main/search/tag/list")
    public BaseResponse searchTagList(@RequestParam String keyword) {

        List<SearchByResponse> getSearchByResponse = mainPageService.searchTagList(keyword);

        return new BaseResponse("검색 결과를 가져오는데 성공했습니다.", getSearchByResponse);
    }

    /**
     * Top10 태그 사용순 리스트 가져오기
     * [GET] /main/top10/tag/list
     * @return
     */
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
    @GetMapping("/main/best/viewed/list/more")
    public BaseResponse boardListOrderByCommentedMore(){
        List<BoardResponseInCardFormat> pages = boardService.findBoarViewedByCommentedMore();
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 알림 목록 가져오기
     * [GET] /auth/main/user/notification/list/{user_id}
     * @param user_id
     * @return
     */
    @GetMapping("/auth/main/user/notification/list/{user_id}")
    public BaseResponse notificationList(@PathVariable Long user_id, @SortDefault(sort = "createDate", direction = Sort.Direction.DESC) Sort sort) {
        GetNotificationResponse getNotificationResponse = mainPageService.notificationByUser(user_id, sort);

        return new BaseResponse("알림 목록을 불러왔습니다.", getNotificationResponse);
    }


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
    @GetMapping("/main/auto/tag/search/list")
    public BaseResponse autoTagSearchList(@RequestParam String keyword) {
        GetAutoSearchList getAutoTagSearchList = mainPageService.autoTagSearchList(keyword);

        return new BaseResponse("태그 자동완성 리스트를 불러오는데 성공했습니다.", getAutoTagSearchList);
    }
}