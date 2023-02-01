package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.GetSearchByResponse;
import teamproject.backend.response.BaseResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MainPageController {

    private final MainPageService mainPageService;


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
}
