package teamproject.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeleteBoardLikesRequest {

    @NotNull(message = "boardIdList가 비어있습니다.", groups = ValidationGroup.NotNullGroup.class)
    private Long[] boardIdList;
}
