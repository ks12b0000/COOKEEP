package teamproject.backend.mypage.dto;

import lombok.Getter;
import teamproject.backend.domain.User;

@Getter
public class GetUserResponse {

    private String username;
    private String email;
    private String nickname;

    public GetUserResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
    }
}
