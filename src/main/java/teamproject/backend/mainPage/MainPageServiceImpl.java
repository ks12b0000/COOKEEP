package teamproject.backend.mainPage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardListResponseByCategory;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.boardTag.BoardTagRepository;
import teamproject.backend.boardTag.BoardTagService;
import teamproject.backend.domain.*;
import teamproject.backend.mainPage.dto.*;
import teamproject.backend.mypage.MyPageRepository;
import teamproject.backend.mypage.dto.GetNotificationResponse;
import teamproject.backend.mypage.dto.NotificationResponse;
import teamproject.backend.notification.NotificationRepository;
import teamproject.backend.response.BaseException;
import teamproject.backend.tag.TagRepository;

import java.util.ArrayList;
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
    private final MyPageRepository myPageRepository;
    private final NotificationRepository notificationRepository;
    private final SearchRepository searchRepository;
    private final BoardTagService boardTagService;


    /**
     * 제목으로 검색 목록
     * @param keyword
     * @return
     */
    @Transactional
    @Override
    public List<BoardResponseInCardFormat> searchList(String keyword) {
        List<Board> searchList = mainPageRepository.findByTitleContaining(keyword);

        if (hasKeywordSearch(keyword)) {
            SearchKeyword searchKeyword = searchRepository.findByKeyword(keyword).get();
            searchKeyword.increaseSearchCount();
            return getBoardResponsesInCardFormat(searchList, searchList.size());
        }
        searchSave(keyword);

        return getBoardResponsesInCardFormat(searchList, searchList.size());
    }

    /**
     * 태그로 검색 목록
     * @param keyword
     * @return
     */
    @Override
    public GetSearchByResponse searchTagList(String keyword) {
        Tag tag = tagRepository.findByTagName(keyword);

        List<SearchByResponse> boardTagList = boardTagRepository.findByTag(tag).stream().map(BoardTag::toSearchDto).collect(Collectors.toList());

        GetSearchByResponse getSearchByResponse = GetSearchByResponse.builder().searchList(boardTagList).build();

        return getSearchByResponse;
    }

    /**
     * Top10 태그 사용순 리스트 가져오기
     * @return
     */
    @Override
    public GetTop10TagList top10TagList() {
        List<Top10TagList> tagList = tagRepository.TOP_10_TAG_LISTS().stream().map(Tag::top10TagList).collect(Collectors.toList());

        GetTop10TagList getTop10TagList = GetTop10TagList.builder().top10TagLists(tagList).build();

        return getTop10TagList;
    }

    /**
     * Top10 인기 검색어 리스트 가져오기
     * @return
     */
    @Override
    public GetTop10SearchList top10SearchList() {
        List<Top10SearchList> searchLists = searchRepository.findTop10ByOrderBySearchedDesc().stream().map(SearchKeyword::top10SearchList).collect(Collectors.toList());

        GetTop10SearchList getTop10SearchList = GetTop10SearchList.builder().top10SearchLists(searchLists).build();

        return getTop10SearchList;
    }

    /**
     * 알림 목록 가져오기
     * @param user_id
     * @return
     */
    @Override
    public GetNotificationResponse notificationByUser(Long user_id, Sort sort) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));
        List<NotificationResponse> notificationList = notificationRepository.findByUser(user, sort).stream().map(Notification::toDto).collect(Collectors.toList());

        GetNotificationResponse getNotificationResponse = GetNotificationResponse.builder().notificationList(notificationList).build();

        return getNotificationResponse;
    }

    /**
     * 검색어 자동완성 기능
     * @param keyword
     * @return
     */
    @Override
    public GetAutoSearchList autoSearchList(String keyword) {
        List<AutoSearchList> autoSearchList = searchRepository.findByKeywordContaining(keyword).stream().map(SearchKeyword::autoSearchList).collect(Collectors.toList());

        GetAutoSearchList getAutoSearchList = GetAutoSearchList.builder().autoSearchLists(autoSearchList).build();

        return getAutoSearchList;
    }

    /**
     * 태그 자동완성 기능
     * @param keyword
     * @return
     */
    @Override
    public GetAutoSearchList autoTagSearchList(String keyword) {
        List<AutoSearchList> autoSearchList = tagRepository.findByTagNameContaining(keyword).stream().map(Tag::autoSearchList).collect(Collectors.toList());

        GetAutoSearchList getAutoSearchList = GetAutoSearchList.builder().autoSearchLists(autoSearchList).build();

        return getAutoSearchList;
    }

    public void searchSave(String keyword) {
        SearchKeyword search = new SearchKeyword(keyword);
        searchRepository.save(search);
    }
    public boolean hasKeywordSearch(String keyword) {
        return searchRepository.findByKeyword(keyword).isPresent();
    }

    private List<BoardResponseInCardFormat> getBoardResponsesInCardFormat(List<Board> boards, int length){
        List<BoardResponseInCardFormat> responses = new ArrayList<>();
        int min = Math.min(boards.size(), length);
        for(int i = 0; i < min; i++){
            Board board = boards.get(i);
            String tags = boardTagService.findTagsByBoard(board);
            responses.add(new BoardResponseInCardFormat(board, tags));
        }
        return responses;
    }
}
