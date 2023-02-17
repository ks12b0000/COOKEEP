package teamproject.backend.imageFile;

import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.imageFile.dto.ImageFileResponse;

import java.io.IOException;

public interface ImageFileService {
    ImageFileResponse save(MultipartFile imageFile, Long userId) throws IOException;
    void delete(String name);
}
