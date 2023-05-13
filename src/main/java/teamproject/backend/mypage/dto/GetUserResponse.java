package teamproject.backend.mypage.dto;

import lombok.Getter;
import teamproject.backend.domain.User;

@Getter
public class GetUserResponse {

    private String username;
    private String email;
    private String nickname;
<<<<<<< HEAD
    private Long userId;
=======
    private String user_image;
>>>>>>> 7400430bcd76bc0b62afcc1d428ac73efeea0f4a

    public GetUserResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
<<<<<<< HEAD
        this.userId = user.getId();
=======
        this.user_image = user.getImageURL();
>>>>>>> 7400430bcd76bc0b62afcc1d428ac73efeea0f4a
    }
}
