package teamproject.backend.boardCommentReply.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentReplyListResponse {
    private List<BoardCommentReplyResponse> list;
    private int total;
}
