package teamproject.backend.imageFile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageFileResponse {
    private boolean uploaded;
    private String fileName;
    private String url;
}
