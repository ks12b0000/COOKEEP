package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import teamproject.backend.user.dto.LoginResponse;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class BoardLike {

    // 좋아요 아이디
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    // 좋아요 누른 글
    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 방식, 실제 board를 사용하는 시점에만 조회하는 쿼리 나감.
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    // 좋아요 누른 유저
    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 방식, 실제 Member를 사용하는 시점에만 조회하는 쿼리 나감.
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // 유저가 지워지면, 사용자 - 게시글의 연관관계인 like 릴레이션도 삭제가 됩니다.
    private User user;

    @Column(nullable = false)
    private boolean status; // true = 좋아요, false = 좋아요 취소

    public BoardLike(Board board, User user) {
        this.board = board;
        this.user = user;
        this.status = true;
    }
}
