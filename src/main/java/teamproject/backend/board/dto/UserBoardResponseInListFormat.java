package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserBoardResponseInListFormat {
    private List<BoardResponseInBannerFormat> boardList;
    private String username;
    private String userPicture;

    public UserBoardResponseInListFormat(List<Board> boards, User user) {
        this.boardList = new ArrayList<>();
        for(Board board : boards){
            boardList.add(new BoardResponseInBannerFormat(board));
        }
        this.username = user.getNickname();
        //this.userPicture = user.getPicture();
    }
}
