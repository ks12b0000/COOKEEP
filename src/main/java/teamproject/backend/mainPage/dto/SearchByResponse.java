package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;
import teamproject.backend.domain.Board;

import java.util.Date;

@Getter
public class SearchByResponse {

    private Long board_id;
    private String category;
    private String title;
    private String user_name;
    private Date create_date;
    private String thumbnail;
    private String tags;
    private Integer commented;
    private Integer liked;

    public SearchByResponse(Board board, String tags) {
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
}
