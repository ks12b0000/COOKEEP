package teamproject.backend.board.dto;


import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "카테고리", example = "한식", required = true)
    @NotBlank(message = "카테고리를 정해주세요.", groups = ValidationGroup.NotBlankGroup.class)
    private String category;

    @Schema(description = "제목", example = "제목12345", required = true)
    @Size(min = 5, message = "제목은 5글자 이상 입력하세요.", groups = ValidationGroup.PatternGroup.class)
    private String title;

    @Schema(description = "본문", example = "본문12345", required = true)
    @Size(min = 5, message = "본문의 내용은 5글자 이상 입력하세요.", groups = ValidationGroup.PatternGroup.class)
    private String text;

    @Schema(description = "유저 인덱스", example = "1", required = true)
    @NotNull(message = "유저 id를 입력하세요.", groups = ValidationGroup.NotNullGroup.class)
    private Long user_id;

    @Schema(description = "썸네일", example = "~~~~")
    private String thumbnail;

    @Schema(description = "태그", example = "#태그")
    private String tags;
}
