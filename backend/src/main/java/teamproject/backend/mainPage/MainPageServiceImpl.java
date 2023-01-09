package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.Board;
import teamproject.backend.mainPage.dto.GetSearchByResponse;
import teamproject.backend.mainPage.dto.SearchByResponse;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MainPageServiceImpl implements MainPageService {

    private final MainPageRepository mainPageRepository;


    /**
     * 제목으로 검색 목록
     * @param keyword
     * @return
     */
    @Override
    public GetSearchByResponse searchList(String keyword) {
        List<SearchByResponse> searchList = mainPageRepository.findByTitleContaining(keyword).stream().map(Board::toSearchDto).collect(Collectors.toList());

        GetSearchByResponse getSearchByResponse = GetSearchByResponse.builder().searchList(searchList).build();

        return getSearchByResponse;
    }
}
