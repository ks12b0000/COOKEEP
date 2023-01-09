package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.mainPage.dto.SearchByResponse;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
public class BoardTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardTag_Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public BoardTag(Board board, Tag tag) {
        this.board = board;
        this.tag = tag;
    }

    public SearchByResponse toSearchDto(){
        return SearchByResponse.builder()
                .board_id(board.getBoard_id())
                .category_id(board.getCategory().getCategory_id())
                .title(board.getTitle())
                .user_id(board.getUser().getId())
                .thumbnail(board.getThumbnail())
                .build();
    }
}
