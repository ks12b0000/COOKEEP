package teamproject.backend.imageFile;

import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.ImageFile;
import teamproject.backend.imageFile.dto.ImageFileResponse;

import java.io.IOException;

public interface ImageFileService {
    ImageFileResponse save(MultipartFile imageFile, Long userId) throws IOException;
    void delete(String fileName);
    Board getUsedBoard(ImageFile imageFile);
    void deleteSaveImages(Long userId, Long boardId);
}
