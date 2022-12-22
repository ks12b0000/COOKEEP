package teamproject.backend.boardComment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.BoardComment;

import javax.persistence.Id;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentResponse {
    private Long comment_id;
    private String user_name;
    private Date create_date;
    private String text;
    private Integer replyCount;

    public BoardCommentResponse(BoardComment comment) {
        this.comment_id = comment.getBoardComment_id();
        this.user_name = comment.getUser().getUsername();
        this.create_date = comment.getCreateDate();
        this.text = comment.getText();
        this.replyCount = comment.getReplyCnt();
    }
}
