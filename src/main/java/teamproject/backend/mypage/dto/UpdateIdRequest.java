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
public class UpdateIdRequest {

    // 유저 변경 아이디 (영문, 숫자 조합 5~13자 )
    @NotBlank(message = "변경 할 아이디를 입력하세요.", groups = NotBlankGroup.class)
    @Pattern(regexp= "^(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{5,13}$", message = "아이디는 5자 이상의 영어, 숫자를 포함해주세요.", groups = PatternGroup.class)
    private String updateUsername;
}
