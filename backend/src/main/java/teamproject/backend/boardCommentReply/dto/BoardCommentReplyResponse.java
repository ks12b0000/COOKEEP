package teamproject.backend.boardCommentReply.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.BoardCommentReply;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentReplyResponse {
    private Long reply_id;
    private String user_name;
    private Date create_date;
    private String text;

    public BoardCommentReplyResponse(BoardCommentReply reply) {
        this.reply_id = reply.getBoardCommentReply_id();
        this.user_name = reply.getUser().getUsername();
        this.create_date = reply.getCreateDate();
        this.text = reply.getText();
    }
}
