package teamproject.backend.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import static teamproject.backend.response.ValidationGroup.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    // 유저 아이디
    @Schema(description = "아이디", example = "test1234sd5", required = true)
    @NotBlank(message = "아이디를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,13}$", message = "아이디는 5자 이상의 영어, 숫자를 조합해 입력해주세요.", groups = PatternGroup.class)
    private String username;

    // 유저 비밀번호
    @Schema(description = "비밀번호", example = "test1234ds5", required = true)
    @NotBlank(message = "비밀번호를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!?@#$%&*]{5,15}$", message = "비밀번호는 5자 이상의 영어, 숫자를 포함해주세요.", groups = PatternGroup.class)
    private String password;

    // 자동 로그인
    @Schema(description = "자동 로그인 여부", example = "true", required = true)
    @NotNull(message = "자동 로그인 여부는 필수값입니다.", groups = NotNullGroup.class)
    private Boolean autoLogin;
}
