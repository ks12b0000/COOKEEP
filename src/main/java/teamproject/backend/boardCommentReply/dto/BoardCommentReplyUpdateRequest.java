package teamproject.backend.boardCommentReply.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class BoardCommentReplyUpdateRequest {
    @Schema(description = "대댓글 인덱스", example = "1", required = true)
    @NotBlank(message = "reply_id를 입력해주세요.", groups = ValidationGroup.NotBlankGroup.class)
    private Long reply_id;

    @Schema(description = "수정할 대댓글 내용", example = "CommentReply123", required = true)
    @Size(min = 5, message = "댓글의 내용은 5글자 이상 입력하세요.", groups = ValidationGroup.PatternGroup.class)
    private String text;

    @Schema(description = "유저 인덱스", example = "1", required = true)
    @NotNull(message = "유저 id를 입력하세요.", groups = ValidationGroup.NotNullGroup.class)
    private Long user_id;
}
