package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CheckUserLikeBoard {
    boolean like;
    Long boardId;
}
