package teamproject.backend.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import static teamproject.backend.response.ValidationGroup.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    // 유저 아이디
    @Schema(description = "아이디", example = "test1234sd5", required = true)
    @NotBlank(message = "아이디를 입력하세요.", groups = NotBlankGroup.class)
    private String username;

    // 유저 비밀번호
    @Schema(description = "비밀번호", example = "test1234ds5", required = true)
    @NotBlank(message = "비밀번호를 입력하세요.", groups = NotBlankGroup.class)
    private String password;

    // 자동 로그인
    @Schema(description = "자동 로그인 여부", example = "true", required = true)
    @NotNull(message = "자동 로그인 여부는 필수값입니다.", groups = NotNullGroup.class)
    private Boolean autoLogin;
}
