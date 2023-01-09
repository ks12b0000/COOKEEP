package teamproject.backend.mainPage;


import teamproject.backend.mainPage.dto.GetSearchByResponse;

public interface MainPageService {

    public GetSearchByResponse searchList(String keyword);
}
