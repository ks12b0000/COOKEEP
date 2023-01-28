package teamproject.backend.mainPage;


import teamproject.backend.domain.Tag;
import teamproject.backend.mainPage.dto.GetSearchByResponse;

import java.util.List;

public interface MainPageService {

    public GetSearchByResponse searchList(String keyword);
    public GetSearchByResponse searchTagList(String keyword);
    public List<Tag> allTagList();
}
