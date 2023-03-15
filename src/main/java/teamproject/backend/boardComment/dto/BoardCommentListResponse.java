package teamproject.backend.boardComment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentListResponse {
    private List<BoardCommentResponse> list;
    private int total;
}
