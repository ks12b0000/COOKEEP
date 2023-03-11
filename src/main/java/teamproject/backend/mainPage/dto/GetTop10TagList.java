package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetTop10TagList {
    List<Top10TagList> top10TagLists;

    @Builder
    public GetTop10TagList(List<Top10TagList> top10TagLists) {
        this.top10TagLists = top10TagLists;
    }
}
