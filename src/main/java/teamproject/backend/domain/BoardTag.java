package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import teamproject.backend.mainPage.dto.SearchByResponse;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class BoardTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @ManyToOne(fetch = FetchType.EAGER)//boardTag 조회시 Tag를 반드시 조회하는 구조
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public BoardTag(Board board, Tag tag) {
        this.board = board;
        this.tag = tag;
    }
}
