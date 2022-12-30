package teamproject.backend.mypage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.GetUserResponse;
import teamproject.backend.mypage.dto.UpdatePwRequest;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.dto.FindPwRequest;
import teamproject.backend.utils.SHA256;

import static teamproject.backend.response.BaseExceptionStatus.USER_NOT_EXIST;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MyPageServiceImpl implements MyPageService {

    private final MyPageRepository myPageRepository;

    /**
     * 마이페이지 조회
     * @param userId
     * @return
     */
    @Override
    public GetUserResponse userInfo(Long userId) {
        User user = myPageRepository.findById(userId).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        return new GetUserResponse(user);
    }
//
//    @Override
//    @Transactional
//    public void updateByUserPw(UpdatePwRequest updatePwRequest) {
//
//        String password = updatePwRequest.getPassword();
//
//        User user = myPageRepository.findByPassword(password);
//
//        if (user == null) {
//            throw new BaseException(USER_NOT_EXIST);
//        }
//
//        String updatePassword = updatePwRequest.getUpdatePassword();
//        String encPassword = SHA256.encrypt(updatePassword);
//        user.updatePassword(encPassword);
//    }
}
