package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;

@Getter
public class BoardByUserResponse {

    private Long board_id;
    private String title;
    private Integer commented;

    @Builder
    public BoardByUserResponse(Long board_id, String title, Integer commented) {
        this.board_id = board_id;
        this.title = title;
        this.commented = commented;
    }
}
