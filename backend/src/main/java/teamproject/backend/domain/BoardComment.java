package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
public class BoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardComment_id;

    //댓글 작성자, FK(외래키 - User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //댓글이 작성된 글
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    //댓글 내용
    @Column
    private String text;

    //글 작성 시간
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column
    private int replyCnt;

    public BoardComment(User user, Board board, String text) {
        this.user = user;
        this.board = board;
        this.text = text;
        this.createDate = new Date(System.currentTimeMillis());
        this.replyCnt = 0;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void increaseReplyCount(){
        replyCnt++;
    }

    public void decreaseReplyCount(){
        replyCnt--;
    }
}
