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
    private Long user_id;
    private String user_image;
    private String create_date;
    private String text;
    private boolean edit_selected = false;
    private boolean icon_selected = false;
    private boolean modal_selected = false;

    public BoardCommentReplyResponse(BoardCommentReply reply) {
        this.reply_id = reply.getBoardCommentReplyId();
        this.user_name = reply.getUser().getNickname();
        this.create_date = asString(reply.getCreateDate());
        this.text = reply.getText();
    }

    public BoardCommentReplyResponse(Long reply_id, String user_name, Long user_id, String user_image, Date create_date, String text) {
        this.reply_id = reply_id;
        this.user_name = user_name;
        this.user_id = user_id;
        this.user_image = user_image;
        this.create_date = asString(create_date);
        this.text = text;
    }

    private String asString(Date date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd HH:mm");
        return format.format(date);
    }
}
