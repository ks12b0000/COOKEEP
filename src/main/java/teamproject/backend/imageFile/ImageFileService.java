package teamproject.backend.imageFile;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.imageFile.dto.ImageFileResponse;
import teamproject.backend.imageFile.dto.ImageFileSaveRequest;

import java.io.IOException;
import java.net.MalformedURLException;

public interface ImageFileService {
    ImageFileResponse save(MultipartFile imageFile, Long userId) throws IOException;
    ImageFileResponse findById(Long imageId) throws MalformedURLException;
    void delete(String name);
}
