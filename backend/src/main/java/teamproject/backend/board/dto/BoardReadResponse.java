package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardReadResponse {
    private Long board_id;
    private String category;
    private String title;
    private String text;
    private String user_name;
    private Date create_date;
    private String thumbnail;

    public BoardReadResponse(Board board){
        this.board_id = board.getBoard_id();
        this.category = board.getCategory().getCategoryName();
        this.title = board.getTitle();
        this.text = board.getText();
        this.user_name = board.getUser().getUsername();
        this.create_date = board.getCreateDate();
        this.thumbnail = board.getThumbnail();
    }
}