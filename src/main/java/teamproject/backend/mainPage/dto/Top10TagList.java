package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Top10TagList {

    private Long tag_id;
    private String tag_name;

    @Builder
    public Top10TagList(Long tag_id, String tag_name) {
        this.tag_id = tag_id;
        this.tag_name = tag_name;
    }

}
