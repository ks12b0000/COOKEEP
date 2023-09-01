package teamproject.backend.mainpage;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.BoardRepository;
import teamproject.backend.board.dto.BoardListResponseAll;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.boardComment.BoardCommentRepository;
import teamproject.backend.boardTag.BoardTagRepository;
import teamproject.backend.boardTag.BoardTagService;
import teamproject.backend.domain.*;
import teamproject.backend.imageFile.ImageFileRepository;
import teamproject.backend.mainPage.MainPageRepository;
import teamproject.backend.mainPage.MainPageServiceImpl;
import teamproject.backend.mainPage.SearchRepository;
import teamproject.backend.mainPage.dto.GetTop10TagList;
import teamproject.backend.mainPage.dto.SearchListResponseAll;
import teamproject.backend.tag.TagRepository;
import teamproject.backend.user.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Transactional
@Slf4j
@ExtendWith(MockitoExtension.class)
public class MainPageServiceTest {

    @InjectMocks
    private MainPageServiceImpl mainPageService;

    @Mock
    private SearchRepository searchRepository;

    @Mock
    private MainPageRepository mainPageRepository;

    @Mock
    private BoardTagService boardTagService;

    @Mock
    private BoardCommentRepository boardCommentRepository;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private BoardTagRepository boardTagRepository;

    @Test
    @DisplayName("제목으로 검색")
    void searchList() {
        // given
        String keyword = "test123";
        Page<Board> boards = Page.empty();

        // stub
        when(mainPageRepository.findByTitleContaining(keyword, null)).thenReturn(boards);

        // when
        BoardListResponseAll responseAll = mainPageService.searchList(keyword, null);

        // then
        assertThat(responseAll).isNotNull();
        assertThat(responseAll.getTotal()).isEqualTo(1);
    }

    @Test
    @DisplayName("태그로 검색")
    void searchTagList() {
        // given
        String keyword = "tag1";
        Tag tag = new Tag("tag1");

        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);
        BoardWriteRequest boardWriteRequest = new BoardWriteRequest("testCategory", "title12", "text123", user.getId(), "testThumbnail", "tag1");
        FoodCategory foodCategory = new FoodCategory("testCategory");
        Board board = new Board(foodCategory, boardWriteRequest, user);

        BoardTag boardTag = new BoardTag(board, tag);
        List<BoardTag> boardTags = new ArrayList<>();
        boardTags.add(boardTag);
        PageImpl page = new PageImpl(boardTags);

        // stub
        when(tagRepository.findByTagName(keyword)).thenReturn(tag);
        when(boardTagRepository.findByTag(tag, null)).thenReturn(page);

        // when
        SearchListResponseAll list = mainPageService.searchTagList(keyword, null);

        // then
        assertAll(
                () -> assertThat(list).isNotNull(),
                () -> assertThat(list.getTotal()).isEqualTo(1),
                () -> assertThat(list.getBoards().get(0).getBoard_id()).isEqualTo(board.getBoardId()),
                () -> assertThat(list.getBoards().get(0).getCategory()).isEqualTo(board.getCategory().getCategoryName()),
                () -> assertThat(list.getBoards().get(0).getTitle()).isEqualTo(board.getTitle())
        );
    }

    @Test
    @DisplayName("Top10 태그 사용순 목록 가져오기")
    void top10TagList() {
        // given
        Tag tag = new Tag("tag1");
        List<Tag> list = new ArrayList<>();
        list.add(tag);

        // stub
        when(tagRepository.TOP_10_TAG_LISTS()).thenReturn(list);

        // when
        GetTop10TagList getTop10TagList = mainPageService.top10TagList();

        // then
        assertAll(
                () -> assertThat(getTop10TagList).isNotNull(),
                () -> assertThat(getTop10TagList.getTop10TagLists().size()).isEqualTo(1),
                () -> assertThat(getTop10TagList.getTop10TagLists().get(0).getTag_name()).isEqualTo("tag1")
        );
    }
}
