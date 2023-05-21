package teamproject.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UploadUserImageResponse {

    private boolean pass;
    private String url;
}
