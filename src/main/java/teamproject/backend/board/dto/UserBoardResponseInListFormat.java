package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.User;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserBoardResponseInListFormat {
    private List<BoardResponseInBannerFormat> boardList;
    private String username;
    private String userPicture;
    private Long total;

    public UserBoardResponseInListFormat(List<BoardResponseInBannerFormat> boardList, User user, Long total) {
        this.boardList = boardList;
        this.username = user.getNickname();
        this.userPicture = user.getImageURL();
        this.total = total;
    }
}
