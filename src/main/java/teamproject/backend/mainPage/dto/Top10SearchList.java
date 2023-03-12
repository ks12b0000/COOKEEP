package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Top10SearchList {
    private Long search_id;
    private String keyword;

    @Builder
    public Top10SearchList(Long search_id, String keyword) {
        this.search_id = search_id;
        this.keyword = keyword;
    }
}
