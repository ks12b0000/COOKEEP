package teamproject.backend.mypage;

import teamproject.backend.mypage.dto.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MyPageService {

    public GetUserResponse userInfo(Long userId);

    public CheckIdPwResponse checkPassword(CheckPwRequest checkPwRequest);

    public void updateByUserPw(Long user_id, UpdatePwRequest updatePwRequest, HttpServletResponse response);

    public void updateByUserId(Long user_id, UpdateIdRequest updateIdRequest, HttpServletResponse response);

    public void updateByUserEmail(Long user_id, UpdateEmailRequest updateEmailRequest, HttpServletResponse response);

    public void userDelete(Long user_id);

    public GetLikeByUserResponse likeByUser(Long user_id);

    public GetBoardByUserResponse boardByUser(Long user_id);
}
