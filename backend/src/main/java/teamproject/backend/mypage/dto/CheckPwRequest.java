package teamproject.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import static teamproject.backend.response.ValidationGroup.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckPwRequest {

    // 유저 비밀번호 확인
    @NotBlank(message = "비밀번호를 입력하세요.", groups = NotBlankGroup.class)
    private String password;
}
