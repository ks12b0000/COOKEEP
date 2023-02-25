package teamproject.backend.imageFile.S3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3DAO {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String getURL(String fileName){
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public String upload(MultipartFile uploadFile) throws IOException {
        String fileName = UUID.randomUUID() + "-" + uploadFile.getOriginalFilename();
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(uploadFile.getInputStream().available());
        amazonS3Client.putObject(bucket, fileName, uploadFile.getInputStream(), objMeta);
        return fileName;
    }

    public void delete(String fileName){
        amazonS3Client.deleteObject(bucket, fileName);
    }
}
