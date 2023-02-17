package teamproject.backend.imageFile;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.domain.ImageFile;
import teamproject.backend.domain.User;
import teamproject.backend.imageFile.S3.S3DAO;
import teamproject.backend.imageFile.dto.ImageFileResponse;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.user.UserRepository;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageFileServiceImpl2 implements ImageFileService{
    private final S3DAO s3DAO;
    private final ImageFileRepository imageFileRepository;
    private final UserRepository userRepository;

    @Override
    public ImageFileResponse save(MultipartFile multipartFile, Long userId) throws IOException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS);

        String s3FileName = s3DAO.upload(multipartFile);
        String url = s3DAO.getURL(s3FileName);

        ImageFile imageFile = new ImageFile(s3FileName, url, user.get());
        imageFileRepository.save(imageFile);

        return new ImageFileResponse(true, s3FileName, url);
    }

    @Override
    public ImageFileResponse findById(Long imageId) throws MalformedURLException {
        return null;
    }

    @Override
    public void delete(String name) {
        s3DAO.delete(name);

        ImageFile imageFile = imageFileRepository.findByFileName(name);
        imageFileRepository.delete(imageFile);
    }
}
