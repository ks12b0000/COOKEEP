package teamproject.backend.imageFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.domain.ImageFile;
import teamproject.backend.domain.User;
import teamproject.backend.imageFile.dto.ImageFileResponse;
import teamproject.backend.imageFile.dto.ImageFileSaveRequest;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.user.UserRepository;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageFileServiceImpl implements ImageFileService{

    private final AmazonS3 amazonS3;
    private final ImageFileRepository imageFileRepository;
    private final UserRepository userRepository;
    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    @Override
    public ImageFileResponse save(MultipartFile multipartFile, Long user_id) throws IOException {

        Optional<User> user = userRepository.findById(user_id);
        if(user.isEmpty()) throw new BaseException(BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS);

        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        ImageFile imageFile = new ImageFile(s3FileName, amazonS3.getUrl(bucket, s3FileName).toString(), user.get());
        imageFileRepository.save(imageFile);

        return new ImageFileResponse(true, s3FileName, amazonS3.getUrl(bucket, s3FileName).toString());
    }

    @Override
    public ImageFileResponse findByFileName(String name) throws MalformedURLException {
        ImageFile imageFile = imageFileRepository.findByFileName(name);

        return new ImageFileResponse(true, imageFile.getFileName(), imageFile.getUrl());
    }

    @Override
    public void delete(String name) {

    }
}
