package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetCommentByUserResponse {
    List<CommentByUserResponse> commentList;

    @Builder
    public GetCommentByUserResponse(List<CommentByUserResponse> commentList) {
        this.commentList = commentList;
    }
}
