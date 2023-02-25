package teamproject.backend.mypage;

import org.springframework.data.domain.Sort;
import teamproject.backend.mypage.dto.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MyPageService {

    public GetUserResponse userInfo(Long userId);

    public CheckIdPwResponse checkPassword(CheckPwRequest checkPwRequest, Long user_id);

    public void updateByUserPw(Long user_id, UpdatePwRequest updatePwRequest, HttpServletResponse response);

    public void updateByUserId(Long user_id, UpdateIdRequest updateIdRequest, HttpServletResponse response);

    public void updateByUserEmail(Long user_id, UpdateEmailRequest updateEmailRequest, HttpServletResponse response);

    public void userDelete(Long user_id, HttpServletResponse response);

    public GetLikeByUserResponse likeByUser(Long user_id);

    public GetBoardByUserResponse boardByUser(Long user_id);

    public GetNotificationResponse notificationByUser(Long user_id);
}
