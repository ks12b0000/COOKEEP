package teamproject.backend.imageFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.domain.ImageFile;
import teamproject.backend.domain.User;
import teamproject.backend.imageFile.dto.ImageFileResponse;
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
    @Transactional
    public ImageFileResponse save(MultipartFile multipartFile, Long user_id) throws IOException {
        //유저 검증
        Optional<User> user = userRepository.findById(user_id);
        if(user.isEmpty()) throw new BaseException(BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS);

        //파일 이름 변경(중복 방지)
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        //사진 변환
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        //s3에 사진 저장
        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        //DB에 사진 정보 저장
        ImageFile imageFile = new ImageFile(s3FileName, amazonS3.getUrl(bucket, s3FileName).toString(), user.get());
        imageFileRepository.save(imageFile);

        return new ImageFileResponse(true, s3FileName, amazonS3.getUrl(bucket, s3FileName).toString());
    }

    @Override
    public ImageFileResponse findById(Long image_id) throws MalformedURLException {
        Optional<ImageFile> imageFile = imageFileRepository.findById(image_id);
        if(imageFile.isEmpty()) throw new BaseException(BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS);// 존재하지 않는 사진입니다. 새로 만들기
        return new ImageFileResponse(true, imageFile.get().getFileName(), imageFile.get().getUrl());
    }

    @Override
    @Transactional
    public void delete(String url) {
        //DB 삭제
        ImageFile imageFile = imageFileRepository.findByUrl(url);
        if(imageFile != null) {
            imageFileRepository.delete(imageFile);
            return;
        }

        //이름추출
        int index = url.lastIndexOf("/");
        String name = url.substring(index + 1);

        //s3 삭제
        amazonS3.deleteObject(bucket, name);
    }
}
