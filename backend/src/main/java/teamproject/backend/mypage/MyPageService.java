package teamproject.backend.mypage;

import teamproject.backend.mypage.dto.*;

import javax.servlet.http.HttpServletResponse;

public interface MyPageService {

    public GetUserResponse userInfo(Long userId);

    public CheckIdPwResponse checkPassword(CheckPwRequest checkPwRequest);

    public void updateByUserPw(Long user_id, UpdatePwRequest updatePwRequest, HttpServletResponse response);

    public void updateByUserId(Long user_id, UpdateIdRequest updateIdRequest, HttpServletResponse response);
}
