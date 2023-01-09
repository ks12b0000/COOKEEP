package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.boardTag.BoardTagRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.GetSearchByResponse;
import teamproject.backend.mainPage.dto.SearchByResponse;
import teamproject.backend.response.BaseException;
import teamproject.backend.tag.TagRepository;

import java.util.List;
import java.util.stream.Collectors;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MainPageServiceImpl implements MainPageService {

    private final MainPageRepository mainPageRepository;
    private final TagRepository tagRepository;
    private final BoardTagRepository boardTagRepository;


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

    /**
     * 태그로 검색 목록
     * @param keyword
     * @return
     */
    @Override
    public GetSearchByResponse searchTagList(String keyword) {
        Tag tag = tagRepository.findByTagName(keyword);

        if (tag == null) {
            throw new BaseException(NOT_EXIST_TAG);
        }

        List<SearchByResponse> boardTagList = boardTagRepository.findByTag(tag).stream().map(BoardTag::toSearchDto).collect(Collectors.toList());

        GetSearchByResponse getSearchByResponse = GetSearchByResponse.builder().searchList(boardTagList).build();

        return getSearchByResponse;
    }
}
