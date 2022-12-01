package teamproject.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SocialUserInfo {

    private Long id;
    private String username;
    private String email;
}
