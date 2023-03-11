package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AutoSearchList {
    private String keyword;

    @Builder
    public AutoSearchList(String keyword) {
        this.keyword = keyword;
    }
}
