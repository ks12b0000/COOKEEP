package teamproject.backend.mainPage;


import org.springframework.data.domain.Sort;
import teamproject.backend.board.dto.BoardResponseInCardFormat;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.*;
import teamproject.backend.mypage.dto.GetNotificationResponse;

import java.util.List;

public interface MainPageService {

    public List<BoardResponseInCardFormat> searchList(String keyword);
    public GetSearchByResponse searchTagList(String keyword);
    public GetTop10TagList top10TagList();
    public GetTop10SearchList top10SearchList();
    public GetNotificationResponse notificationByUser(Long user_id, Sort sort);
    public GetAutoSearchList autoSearchList(String keyword);
}
