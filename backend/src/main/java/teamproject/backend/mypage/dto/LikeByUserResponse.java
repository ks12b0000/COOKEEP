package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.domain.Board;

@Getter
public class LikeByUserResponse {

    private Long board_id;
    private Long category_id;
    private String title;
    private Long user_id;
    private String thumbnail;

    @Builder
    public LikeByUserResponse(Board board) {
        this.board_id = board.getBoard_id();
        this.category_id = board.getCategory().getCategory_id();
        this.title = board.getTitle();
        this.user_id = board.getUser().getId();
        this.thumbnail = board.getThumbnail();
    }
}
