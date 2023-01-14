package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
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
                .board_id(board.getBoardId())
                .category_id(board.getCategory().getCategoryId())
                .title(board.getTitle())
                .user_id(board.getUser().getId())
                .thumbnail(board.getThumbnail())
                .build();
    }
}
