package teamproject.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import static teamproject.backend.response.ValidationGroup.NotBlankGroup;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FindIdRequest {

    // 유저 이메일
    @NotBlank(message = "이메일을 입력하세요.", groups = NotBlankGroup.class)
    @Email(message = "이메일 형식으로 입력해주세요.", groups = ValidationGroup.EmailGroup.class)
    private String email;
}
