package teamproject.backend.boardComment.dto;

import teamproject.backend.domain.BoardComment;

import javax.persistence.Id;
import java.util.Date;

public class BoardCommentResponse {
    private String user_name;
    private Date create_date;
    private String text;
    private Integer replyCount;

    public BoardCommentResponse(BoardComment comment) {
        this.user_name = comment.getUser().getUsername();
        this.create_date = comment.getCreateDate();
        this.text = comment.getText();
        this.replyCount = comment.getReplyCnt();
    }
}
