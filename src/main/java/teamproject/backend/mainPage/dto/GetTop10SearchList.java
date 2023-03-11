package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetTop10SearchList {
    List<Top10SearchList> top10SearchLists;

    @Builder
    public GetTop10SearchList(List<Top10SearchList> top10SearchLists) {
        this.top10SearchLists = top10SearchLists;
    }
}
