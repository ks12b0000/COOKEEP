package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseInCardFormat {
    private Long board_id;
    private String category;
    private String title;
    private String user_name;
    private Date create_date;
    private String thumbnail;
    private String tags;
    private Integer commented;
    private Integer liked;

    public BoardResponseInCardFormat(Board board, String tags) {
        this.board_id = board.getBoardId();
        this.category = board.getCategory().getCategoryName();
        this.title = board.getTitle();
        this.user_name = board.getUser().getNickname();
        this.create_date = board.getCreateDate();
        this.thumbnail = board.getThumbnail();
        this.tags = tags;
        this.commented = board.getCommented();
        this.liked = board.getLiked();
    }

    public BoardResponseInCardFormat(Long board_id, String category, String title, String user_name, Date create_date, String thumbnail, Integer commented, Integer liked, Integer view) {
        this.board_id = board_id;
        this.category = category;
        this.title = title;
        this.user_name = user_name;
        this.create_date = create_date;
        this.thumbnail = thumbnail;
        this.commented = commented;
        this.liked = liked;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}
