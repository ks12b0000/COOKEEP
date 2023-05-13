package teamproject.backend.mypage.dto;

import lombok.Getter;
import teamproject.backend.domain.User;

@Getter
public class GetUserResponse {

    private String username;
    private String email;
    private String nickname;
    private Long userId;

    public GetUserResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.userId = user.getId();
    }
}
