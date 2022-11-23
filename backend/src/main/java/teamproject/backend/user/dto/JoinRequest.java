package teamproject.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.*;

import static teamproject.backend.response.ValidationGroup.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JoinRequest {

    // 유저 아이디 (영문, 숫자 조합 5~13자 )
    @NotBlank(message = "아이디를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,13}$", message = "아이디는 5자 이상의 영어, 숫자를 포함해주세요.", groups = PatternGroup.class)
    private String username;

    // 유저 이메일
    @NotBlank(message = "이메일을 입력하세요.", groups = NotBlankGroup.class)
    @Email(message = "이메일 형식으로 입력해주세요.", groups = EmailGroup.class)
    private String email;

    // 유저 비밀번호 (영문, 숫자 조합 5~15자 특수문자 포함해도되고 안해도 됨.)
    @NotBlank(message = "비밀번호를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!?@#$%&*]{5,15}$", message = "비민번호는 5자 이상의 영어, 숫자를 포함해주세요.", groups = PatternGroup.class)
    private String password;
}
