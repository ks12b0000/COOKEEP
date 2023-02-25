package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.board.BoardService;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.GetSearchByResponse;
import teamproject.backend.mypage.dto.GetNotificationResponse;
import teamproject.backend.response.BaseResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MainPageController {

    private final MainPageService mainPageService;
    private final BoardService boardService;


    /**
     * 제목으로 검색 목록
     * [GET] /main/search/list?keyword=
     * @param keyword
     * @return
     */
    @GetMapping("/main/search/list")
    public BaseResponse searchList(@RequestParam String keyword) {

        GetSearchByResponse getSearchByResponse = mainPageService.searchList(keyword);

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

        GetSearchByResponse getSearchByResponse = mainPageService.searchTagList(keyword);

        return new BaseResponse("검색 결과를 가져오는데 성공했습니다.", getSearchByResponse);
    }

    /**
     * 전체 태그 가져오기
     * [GET] /main/all/tag/list
     * @return
     */
    @GetMapping("/main/all/tag/list")
    public BaseResponse allTagList() {
        List<Tag> tags = mainPageService.allTagList();

        return new BaseResponse("전체 태그 목록을 가져왔습니다.", tags);
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
     * 댓글순 5개 가져오기
     * [GET] /main/best/commented/list
     * @return
     */
    @GetMapping("/main/best/commented/list")
    public BaseResponse boardListOrderByCommented(){
        List<BoardResponseInCardFormat> pages = boardService.findBoarListByCommented();
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
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
}