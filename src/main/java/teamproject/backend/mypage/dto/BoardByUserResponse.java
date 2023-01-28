package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;

@Getter
public class BoardByUserResponse {

    private Long board_id;
    private Long category_id;
    private String title;
    private Long user_id;
    private String thumbnail;

    @Builder
    public BoardByUserResponse(Long board_id, Long category_id, String title, Long user_id, String thumbnail) {
        this.board_id = board_id;
        this.category_id = category_id;
        this.title = title;
        this.user_id = user_id;
        this.thumbnail = thumbnail;
    }
}
