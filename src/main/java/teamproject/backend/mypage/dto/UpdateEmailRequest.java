package teamproject.backend.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEmailRequest {

    // 유저 변경 할 이메일
    @Schema(description = "변경 할 이메일", example = "test123452@gmail.com", required = true)
    @NotBlank(message = "변경 할 이메일을 입력하세요.", groups = ValidationGroup.NotBlankGroup.class)
    @Email(message = "이메일 형식으로 입력해주세요.", groups = ValidationGroup.EmailGroup.class)
    private String updateEmail;
}
