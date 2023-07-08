package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseInDetailFormat {
    private Long board_id;
    private String category;
    private String title;
    private String text;
    private String user_name;
    private Long user_id;
    private String create_date;
    private Long commented;
    private Long liked;
    private Integer view;
    private String thumbnail;

    public BoardResponseInDetailFormat(Board board, Long commentCnt, Long likeCnt){
        this.board_id = board.getBoardId();
        this.category = board.getCategory().getCategoryName();
        this.title = board.getTitle();
        this.text = board.getText();
        this.user_name = board.getUser().getNickname();
        this.user_id = board.getUser().getId();
        this.create_date = asString(board.getCreateDate());
        this.commented = commentCnt;
        this.liked = likeCnt;
        this.view = board.getView();
        this.thumbnail = board.getThumbnail();
    }
    private String asString(Date date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd");
        return format.format(date);
    }

}