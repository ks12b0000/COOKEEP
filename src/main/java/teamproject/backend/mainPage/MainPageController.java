package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.board.BoardService;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.board.dto.BoardResponseInDetailFormat;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.GetSearchByResponse;
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
     * @param pageable
     * @return
     */
    @GetMapping("/main/best/liked/list")
    public BaseResponse boardListOrderByLiked(@PageableDefault(size = 5, sort = "liked", direction = Sort.Direction.DESC) Pageable pageable){
        List<BoardResponseInCardFormat> pages = boardService.findBoarListByAll(pageable);
        return new BaseResponse("성공적으로 글을 가져왔습니다.", pages);
    }

    /**
     * 댓글순 5개 가져오기
     * [GET] /main/best/commented/list
     * @param pageable
     * @return
     */
    @GetMapping("/main/best/commented/list")
    public BaseResponse boardListOrderByCommented(@PageableDefault(size = 5, sort = "commented", direction = Sort.Direction.DESC) Pageable pageable){
        List<BoardResponseInCardFormat> pages = boardService.findBoarListByAll(pageable);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }
}