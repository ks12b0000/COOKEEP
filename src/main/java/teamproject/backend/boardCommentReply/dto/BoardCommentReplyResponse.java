package teamproject.backend.boardCommentReply.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.BoardCommentReply;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentReplyResponse {
    private Long reply_id;
    private String user_name;
    private String create_date;
    private String text;
    private boolean edit_selected;

    public BoardCommentReplyResponse(BoardCommentReply reply) {
        this.reply_id = reply.getBoardCommentReplyId();
        this.user_name = reply.getUser().getUsername();
        this.create_date = asString(reply.getCreateDate());
        this.text = reply.getText();
        this.edit_selected = false;
    }

    private String asString(Date date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(date);
    }
}
