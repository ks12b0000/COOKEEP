package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;

@Getter
public class BoardByUserResponse {

    private Long board_id;
    private String title;
    private Long commented;

    @Builder
    public BoardByUserResponse(Board board, Long commented) {
        this.board_id = board.getBoardId();
        this.title = board.getTitle();
        this.commented = commented;
    }
}
