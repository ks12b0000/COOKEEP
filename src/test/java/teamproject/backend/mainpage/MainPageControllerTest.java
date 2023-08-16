package teamproject.backend.mainpage;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@Transactional
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class MainPageControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    @DisplayName("제목으로 검색")
    void searchList() throws Exception {
        // given
        String keyWord = "keyword";

        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/search/list?keyword=" + keyWord + "&page=" + 0));
        ResultActions likeSortResult = mvc.perform(get("/main/search/list?keyword=" + keyWord + "&sort=liked,desc&page=" + 0));
        ResultActions commentedSortResult = mvc.perform(get("/main/search/list?keyword=" + keyWord + "&sort=commented,desc&page=" + 0));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색 결과를 가져오는데 성공했습니다."));

        likeSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색 결과를 가져오는데 성공했습니다."));

        commentedSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색 결과를 가져오는데 성공했습니다."));
    }

    @Test
    @DisplayName("태그로 검색")
    void searchTagList() throws Exception {
        // given
        String keyWord = "keyword";

        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/search/tag/list?keyword=" + keyWord + "&page=" + 0));
        ResultActions likeSortResult = mvc.perform(get("/main/search/tag/list?keyword=" + keyWord + "&sort=board.liked,desc&page=" + 0));
        ResultActions commentedSortResult = mvc.perform(get("/main/search/tag/list?keyword=" + keyWord + "&sort=board.commented,desc&page=" + 0));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색 결과를 가져오는데 성공했습니다."));

        likeSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색 결과를 가져오는데 성공했습니다."));

        commentedSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색 결과를 가져오는데 성공했습니다."));
    }

    @Test
    @DisplayName("Top10 태그 사용순 리스트 조회")
    void top10TagList() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/top10/tag/list"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("Top10 태그 사용순 리스트를 불러오는데 성공했습니다."));
    }

    @Test
    @DisplayName("Top10 검색어 사용순 리스트 조회")
    void top10SearchList() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/top10/search/list"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("Top10 인기 검색어 리스트를 불러오는데 성공했습니다."));
    }

    @Test
    @DisplayName("Top5 좋아요순 게시글 리스트 조회")
    void boardListOrderByLiked() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/best/liked/list"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("성공적으로 글을 가져왔습니다."));
    }

    @Test
    @DisplayName("Top5 조회순 게시글 리스트 조회")
    void boardListOrderByCommented() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/best/viewed/list"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("성공적으로 글을 가져왔습니다."));
    }

    @Test
    @DisplayName("Top10 좋아요순 게시글 리스트 조회")
    void boardListOrderByLikedMore() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/best/liked/list/more"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("성공적으로 글을 가져왔습니다."));
    }

    @Test
    @DisplayName("Top10 조회순 게시글 리스트 조회")
    void boardListOrderByCommentedMore() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/best/viewed/list/more"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("성공적으로 글을 가져왔습니다."));
    }

    @Test
    @DisplayName("메인 배너 리스트 조회")
    void weeklyBoardRecommend() throws Exception {
        // given
        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/recommend/board/weekly/list"));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("추천 목록을 불러왔습니다."));
    }

    @Test
    @DisplayName("검색어 자동완성 조회")
    void autoSearchList() throws Exception {
        // given
        String keyWord = "keyword";

        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/auto/search/list?keyword=" + keyWord));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("검색어 자동완성 리스트를 불러오는데 성공했습니다."));
    }

    @Test
    @DisplayName("태그 자동완성 조회")
    void autoTagSearchList() throws Exception {
        // given
        String keyWord = "keyword";

        // when
        ResultActions defaultSortResult = mvc.perform(get("/main/auto/tag/search/list?keyword=" + keyWord));

        // then
        defaultSortResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("태그 자동완성 리스트를 불러오는데 성공했습니다."));
    }
}
