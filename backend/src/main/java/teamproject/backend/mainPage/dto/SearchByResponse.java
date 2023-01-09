package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;

@Getter
public class SearchByResponse {

    private Long board_id;
    private Long category_id;
    private String title;
    private String thumbnail;

    @Builder
    public SearchByResponse(Long board_id, Long category_id, String title, String thumbnail) {
        this.board_id = board_id;
        this.category_id = category_id;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
