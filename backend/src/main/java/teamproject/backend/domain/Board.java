package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.board.dto.BoardWriteRequest;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
public class Board{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long board_id;

    //글 작성자, FK(외래키 - User)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //글 카테고리
    @Column
    private String category;

    //글 제목
    @Column(length = 50, nullable = false)
    private String title;

    //글 내용
    @Column
    private String text;

    //글 작성 시간
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    public Board(FoodCategory foodCategory, BoardWriteRequest boardWriteRequest, User user) {
        this.category = foodCategory.getCategoryName();
        this.title = boardWriteRequest.getTitle();
        this.text = boardWriteRequest.getText();
        this.user = user;
        this.createDate = new Date(System.currentTimeMillis());
    }
}
