package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;

@Getter
public class LikeByUserResponse {

    private Long board_id;
    private Long category_id;
    private String title;
    private String thumbnail;

    @Builder
    public LikeByUserResponse(Board board) {
        this.board_id = board.getBoardId();
        this.category_id = board.getCategory().getCategoryId();
        this.title = board.getTitle();
        this.thumbnail = board.getThumbnail();
    }
}
