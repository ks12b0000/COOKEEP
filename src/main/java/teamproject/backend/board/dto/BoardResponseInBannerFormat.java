package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseInBannerFormat {
    private Long board_id;
    private String title;
    private String thumbnail;

    public BoardResponseInBannerFormat(Board board) {
        this.board_id = board.getBoardId();
        this.title = board.getTitle();
        this.thumbnail = board.getThumbnail();
    }
}
