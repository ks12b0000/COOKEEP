package teamproject.backend.mainPage;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import teamproject.backend.board.dto.BoardListResponseAll;
import teamproject.backend.board.dto.BoardListResponseByCategory;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.*;
import teamproject.backend.mypage.dto.GetNotificationResponse;

import java.util.List;

public interface MainPageService {

    public BoardListResponseAll searchList(String keyword, Pageable pageable);
    public SearchListResponseAll searchTagList(String keyword, Pageable pageable);
    public GetTop10TagList top10TagList();
    public GetTop10SearchList top10SearchList();
    public GetAutoSearchList autoSearchList(String keyword);
    public GetAutoSearchList autoTagSearchList(String keyword);
}
