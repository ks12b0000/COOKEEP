package teamproject.backend.boardComment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardCommentUpdateRequest {
    @NotBlank(message = "boardComment_id를 입력해주세요.", groups = ValidationGroup.NotBlankGroup.class)
    private Long boardComment_id;

    @Size(min = 5, message = "댓글의 내용은 5글자 이상 입력하세요.", groups = ValidationGroup.PatternGroup.class)
    private String text;

    @NotNull(message = "유저 id를 입력하세요.", groups = ValidationGroup.NotNullGroup.class)
    private Long user_id;
}
