package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetLikeAndCommentByUserResponse {
    List<LikeAndCommentByUserResponse> commentList;

    @Builder
    public GetLikeAndCommentByUserResponse(List<LikeAndCommentByUserResponse> commentList) {
        this.commentList = commentList;
    }
}
