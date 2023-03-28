package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetLikeAndCommentByUserResponse {
    List<LikeAndCommentByUserResponse> commentList;

    int total;

    @Builder
    public GetLikeAndCommentByUserResponse(List<LikeAndCommentByUserResponse> commentList, int total){
        this.commentList = commentList;
        this.total = total;
    }
}
