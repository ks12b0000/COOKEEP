package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;

import java.util.Date;

@Getter
public class CommentByUserResponse {
    private Long board_id;
    private String title;
    private Integer commented;

    @Builder
    public CommentByUserResponse(Board board) {
        this.board_id = board.getBoardId();
        this.title = board.getTitle();
        this.commented = board.getCommented();
    }
}
