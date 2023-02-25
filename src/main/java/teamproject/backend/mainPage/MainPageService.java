package teamproject.backend.mainPage;


import org.springframework.data.domain.Sort;
import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.GetSearchByResponse;
import teamproject.backend.mypage.dto.GetNotificationResponse;

import java.util.List;

public interface MainPageService {

    public GetSearchByResponse searchList(String keyword);
    public GetSearchByResponse searchTagList(String keyword);
    public List<Tag> allTagList();
    public GetNotificationResponse notificationByUser(Long user_id, Sort sort);
}
