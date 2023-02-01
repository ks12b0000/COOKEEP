package teamproject.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.User;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    // 로그인 성공시 id값 받아옴.
    private Long id;

    private String username;

    public LoginResponse(Long user_id) {
        this.id = user_id;
    }
}
