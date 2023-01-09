package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetSearchByResponse {
    List<SearchByResponse> searchList;

    @Builder
    public GetSearchByResponse(List<SearchByResponse> searchList) {
        this.searchList = searchList;
    }
}
