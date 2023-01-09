package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Getter
@Entity
@NoArgsConstructor
public class BoardCommentReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardCommentReply_id;

    //댓글 작성자, FK(외래키 - User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //댓글이 작성된 글
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardComment_id")
    private BoardComment boardComment;

    //댓글 내용
    @Column
    private String text;

    //글 작성 시간
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    public void setText(String text) {
        this.text = text;
    }
    public BoardCommentReply(User user, BoardComment comment, String text) {
        this.user = user;
        this.boardComment = comment;
        this.text = text;
        this.createDate = new Date(System.currentTimeMillis());
    }
}
