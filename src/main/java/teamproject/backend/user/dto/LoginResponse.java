package teamproject.backend.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.User;

@Getter
@NoArgsConstructor
public class LoginResponse {

    // 로그인 성공시 id값 받아옴.
    private Long id;

    private String username;

    private String user_image;

    public LoginResponse(Long user_id, String username, String user_image) {
        this.id = user_id;
        this.username = username;
        this.user_image = user_image;
    }

    public LoginResponse(Long user_id, String username) {
        this.id = user_id;
        this.username = username;
    }
}
