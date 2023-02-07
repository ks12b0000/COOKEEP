package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @GetMapping("/main/best/liked/list")
    public BaseResponse<List<BoardResponseInCardFormat>> boardListOrderByLiked(){
        List<BoardResponseInCardFormat> pages = boardService.findBoardListOrderByLikedDesc(10);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }

    @GetMapping("/main/best/commented/list")
    public BaseResponse<List<BoardResponseInCardFormat>> boardListOrderByCommented(){
        List<BoardResponseInCardFormat> pages = boardService.findBoardListOrderByCommentedDesc(10);
        return new BaseResponse<>("성공적으로 글을 가져왔습니다.", pages);
    }
}
