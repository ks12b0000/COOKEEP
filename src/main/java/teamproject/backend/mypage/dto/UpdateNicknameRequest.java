package teamproject.backend.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateNicknameRequest {

    @Schema(description = "변경 할 닉네임", example = "변경닉네임", required = true)
    @NotBlank(message = "변경 할 닉네임을 입력하세요.", groups = ValidationGroup.NotBlankGroup.class)
    @Size(message = "닉네임은 3글자에서 15글자 사이로 입력해주세요.", min = 3, max = 15)
    private String nickname;
}
