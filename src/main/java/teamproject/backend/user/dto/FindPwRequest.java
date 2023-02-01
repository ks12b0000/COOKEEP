package teamproject.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static teamproject.backend.response.ValidationGroup.NotBlankGroup;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FindPwRequest {

    // 유저 아이디
    @NotBlank(message = "아이디를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,13}$", message = "아이디는 5자 이상의 영어, 숫자를 포함해주세요.", groups = ValidationGroup.PatternGroup.class)
    private String username;

    // 유저 이메일
    @NotBlank(message = "이메일을 입력하세요.", groups = NotBlankGroup.class)
    @Email(message = "이메일 형식으로 입력해주세요.", groups = ValidationGroup.EmailGroup.class)
    private String email;
}
