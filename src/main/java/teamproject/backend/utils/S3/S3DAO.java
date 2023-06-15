package teamproject.backend.utils.S3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class S3DAO {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    public static final String DEFAULT_USER_IMAGE_URL = "https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/default_user_image.png";

    public String getURL(String fileName){
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public void upload(String fileName, MultipartFile uploadFile) throws IOException {
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(uploadFile.getInputStream().available());
        amazonS3Client.putObject(bucket, fileName, uploadFile.getInputStream(), objMeta);
    }

    public void delete(String fileName){
        amazonS3Client.deleteObject(bucket, fileName);
    }

    public void deleteByURL(String url){
        if(url.equals(DEFAULT_USER_IMAGE_URL))return;
        String[] split = url.split("/");
        String fileName = split[split.length - 1];
        delete(fileName);
    }

    public boolean isExist(String fileName){
        return amazonS3Client.doesObjectExist(bucket,fileName);
    }
}
