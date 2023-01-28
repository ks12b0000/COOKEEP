package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetBoardByUserResponse {
    List<BoardByUserResponse> boardList;

    @Builder
    public GetBoardByUserResponse(List<BoardByUserResponse> boardList) {
        this.boardList = boardList;
    }
}
