package teamproject.backend.board.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardWriteRequest {

    @NotBlank(message = "카테고리를 정해주세요.", groups = ValidationGroup.NotBlankGroup.class)
    private String category;

    @Size(min = 5, message = "제목은 5글자 이상 입력하세요.", groups = ValidationGroup.PatternGroup.class)
    private String title;

    @Size(min = 5, message = "본문의 내용은 5글자 이상 입력하세요.", groups = ValidationGroup.PatternGroup.class)
    private String text;

    @NotNull(message = "유저 id를 입력하세요.", groups = ValidationGroup.NotNullGroup.class)
    private Long user_id;

    private String thumbnail;
}
