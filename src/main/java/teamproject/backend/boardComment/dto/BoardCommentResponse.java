package teamproject.backend.boardComment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.BoardComment;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentResponse {
    private Long comment_id;
    private String user_name;
    private String create_date;
    private String text;
    private Integer replyCount;
    private boolean edit_selected = false;
    private boolean reply_selected = false;
    private boolean icon_selected = false;

    public BoardCommentResponse(Long comment_id, String user_name, Date create_date, String text, Integer replyCount) {
        this.comment_id = comment_id;
        this.user_name = user_name;
        this.create_date = asString(create_date);
        this.text = text;
        this.replyCount = replyCount;
    }

    public BoardCommentResponse(BoardComment comment) {
        this.comment_id = comment.getBoardCommentId();
        this.user_name = comment.getUser().getNickname();
        this.create_date = asString(comment.getCreateDate());
        this.text = comment.getText();
        this.replyCount = comment.getReplyCnt();
    }

    private String asString(Date date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(date);
    }
}
