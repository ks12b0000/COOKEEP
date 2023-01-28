package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.domain.Board;

import java.util.List;

@Getter
public class GetLikeByUserResponse {
    List<LikeByUserResponse> likeList;

    @Builder
    public GetLikeByUserResponse(List<LikeByUserResponse> likeList) {
        this.likeList = likeList;
    }
}
