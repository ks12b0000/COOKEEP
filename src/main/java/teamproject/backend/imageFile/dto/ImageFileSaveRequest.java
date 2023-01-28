package teamproject.backend.imageFile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.response.ValidationGroup;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageFileSaveRequest {

    @NotNull(message = "이미지 파일을 보내주세요", groups = ValidationGroup.NotNullGroup.class)
    private MultipartFile imageFile;

    @NotNull(message = "유저 id를 입력하세요.", groups = ValidationGroup.NotNullGroup.class)
    private Long user_id;
}
