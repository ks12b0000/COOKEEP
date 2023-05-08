package teamproject.backend.mypage;

import org.springframework.data.domain.Pageable;
import teamproject.backend.mypage.dto.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MyPageService {

    public GetUserResponse userInfo(Long userId);

    public CheckIdPwResponse checkPassword(CheckPwRequest checkPwRequest, Long user_id);

    public void updateByUserPw(Long user_id, UpdatePwRequest updatePwRequest, HttpServletResponse response);

    public void updateByUserId(Long user_id, UpdateIdRequest updateIdRequest, HttpServletResponse response);

    public void updateByUserEmail(Long user_id, UpdateEmailRequest updateEmailRequest, HttpServletResponse response);

    public void updateNickname(Long user_id, UpdateNicknameRequest request);

    public void userDelete(Long user_id, HttpServletResponse response);

    public GetLikeAndCommentByUserResponse likeByUser(Pageable pageable, Long user_id);

    public GetBoardByUserResponse boardByUser(Pageable pageable, Long user_id);


    public void deleteBoardLikes(List<Long> boardIds, Long userId);

    public GetNotificationResponse notificationByUser(Long user_id, Pageable pageable);

    public List<String> suggestNickname(int size);

    public GetLikeAndCommentByUserResponse commentByUser(Pageable pageable, Long user_id);

    boolean checkNickNameDuplicate(String nickName);

    public void confirmationUpdateNotification(Long notificationId);
}
