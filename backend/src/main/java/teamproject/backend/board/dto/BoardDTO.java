package teamproject.backend.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class BoardDTO {
    private Long board_id;
    private String title;
    private String category;
    private String text;
    private String user_name;
    private Date create_date;
}
