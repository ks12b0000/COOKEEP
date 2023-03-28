package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetBoardByUserResponse {
    List<BoardByUserResponse> boardList;

    int total;

    @Builder
    public GetBoardByUserResponse(List<BoardByUserResponse> boardList, int total) {
        this.boardList = boardList;
        this.total = total;
    }
}
