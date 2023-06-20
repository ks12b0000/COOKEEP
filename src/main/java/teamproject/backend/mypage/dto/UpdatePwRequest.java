package teamproject.backend.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static teamproject.backend.response.ValidationGroup.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePwRequest {

    // 유저 변경 비밀번호 (영문, 숫자 조합 5~15자 특수문자 포함해도되고 안해도 됨.)
    @Schema(description = "변경 할 비밀번호", example = "test12345", required = true)
    @NotBlank(message = "변경 할 비밀번호를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!?@#$%&*]{5,15}$", message = "비밀번호는 5자 이상의 영어, 숫자를 포함해주세요.", groups = PatternGroup.class)
    private String updatePassword;
}
