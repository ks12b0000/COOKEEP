package teamproject.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePwRequest {

    // 유저 비밀번호 (영문, 숫자 조합 5~15자 특수문자 포함해도되고 안해도 됨.)
    @NotBlank(message = "기존 비밀번호를 입력하세요.", groups = ValidationGroup.NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!?@#$%&*]{5,15}$", message = "비민번호는 5자 이상의 영어, 숫자를 포함해주세요.", groups = ValidationGroup.PatternGroup.class)
    private String password;

    // 유저 변경 비밀번호 (영문, 숫자 조합 5~15자 특수문자 포함해도되고 안해도 됨.)
    @NotBlank(message = "변경 할 비밀번호를 입력하세요.", groups = ValidationGroup.NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!?@#$%&*]{5,15}$", message = "비민번호는 5자 이상의 영어, 숫자를 포함해주세요.", groups = ValidationGroup.PatternGroup.class)
    private String updatePassword;
}
