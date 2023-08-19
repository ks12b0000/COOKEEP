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
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardListResponseAll;
import teamproject.backend.domain.Board;
import teamproject.backend.mainPage.MainPageRepository;
import teamproject.backend.mainPage.MainPageServiceImpl;
import teamproject.backend.mainPage.SearchRepository;

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
    private Pageable pageable;

    @Test
    @DisplayName("제목으로 검색")
    void searchList() {
        String keyword = "테스트";

        Page<Board> page = (Page<Board>) new Board();
        when(mainPageRepository.findByTitleContaining(keyword, null)).thenReturn(page);
        log.info("page = {}", page.toList());
        BoardListResponseAll page2 = mainPageService.searchList(keyword, null);

        Assertions.assertThat(page2).isNotNull();
    }
}
