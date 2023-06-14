package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;


@Getter
public class LikeAndCommentByUserResponse {
    private Long board_id;
    private String title;
    private Long commented;

    public LikeAndCommentByUserResponse(Board board, Long commented) {
        this.board_id = board.getBoardId();
        this.title = board.getTitle();
        this.commented = commented;
    }
}
