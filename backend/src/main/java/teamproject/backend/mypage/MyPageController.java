package teamproject.backend.mypage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.mypage.dto.GetUserResponse;
import teamproject.backend.response.BaseResponse;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/auth/user/mypage")
    public BaseResponse<GetUserResponse> myPageUserInfo(@RequestParam Long user_id) {
        GetUserResponse user = myPageService.userInfo(user_id);

        return new BaseResponse("유저 정보를 성공적으로 가져왔습니다.", user);
    }
}
