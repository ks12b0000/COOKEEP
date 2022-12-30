package teamproject.backend.mypage;

import teamproject.backend.mypage.dto.GetUserResponse;
import teamproject.backend.mypage.dto.UpdatePwRequest;

public interface MyPageService {

    public GetUserResponse userInfo(Long userId);

//    public void updateByUserPw(UpdatePwRequest updatePwRequest);
}
