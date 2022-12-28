package teamproject.backend.mypage;

import teamproject.backend.mypage.dto.GetUserResponse;

public interface MyPageService {

    public GetUserResponse userInfo(Long userId);
}
