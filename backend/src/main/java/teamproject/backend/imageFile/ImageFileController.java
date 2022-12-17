package teamproject.backend.imageFile;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.imageFile.dto.ImageFileResponse;
import teamproject.backend.response.BaseResponse;

import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
public class ImageFileController {

    private final ImageFileService imageFileService;

    @PostMapping("/image")
    public BaseResponse<ImageFileResponse> imageFileUpload(MultipartFile imageFile, Long user_id) throws IOException {
        return new BaseResponse<>("성공적으로 사진이 저장되었습니다.", imageFileService.save(imageFile, user_id));
    }

    @GetMapping("/image")
    public BaseResponse<ImageFileResponse> imageFileDownload(@RequestParam Long image_id) throws MalformedURLException {
        return new BaseResponse<>("사진을 불러왔습니다.",imageFileService.findById(image_id));
    }

    @DeleteMapping("/image")
    public BaseResponse imageFileDelete(@RequestParam String name){
        return new BaseResponse("사진을 삭제했습니다. ");
    }
}
