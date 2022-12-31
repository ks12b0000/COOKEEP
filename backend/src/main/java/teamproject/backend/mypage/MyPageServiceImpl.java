package teamproject.backend.mypage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.*;
import teamproject.backend.response.BaseException;
import teamproject.backend.utils.SHA256;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MyPageServiceImpl implements MyPageService {

    private final MyPageRepository myPageRepository;

    /**
     * 마이페이지 조회
     * @param user_id
     * @return
     */
    @Override
    public GetUserResponse userInfo(Long user_id) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        return new GetUserResponse(user);
    }

    /**
     * 유저 정보 수정 시 비밀번호 확인
     * @param checkPwRequest
     * @return
     */
    @Override
    public CheckIdPwResponse checkPassword(CheckPwRequest checkPwRequest) {
        User user = myPageRepository.findByPassword(SHA256.encrypt(checkPwRequest.getPassword()));

        if(user == null){
            throw new BaseException(USER_NOT_PASSWORD);
        } else {
            return new CheckIdPwResponse(user.getId());
        }
    }

    /**
     * 유저 비밀번호 변경
     * @param user_id
     * @param updatePwRequest
     * @param response
     */
    @Override
    @Transactional
    public void updateByUserPw(Long user_id, UpdatePwRequest updatePwRequest, HttpServletResponse response) {

        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        String updatePassword = SHA256.encrypt(updatePwRequest.getUpdatePassword());
        user.updatePassword(updatePassword);

        // accessToken 삭제
        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        // refreshToken 삭제
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);
    }

    /**
     * 유저 아이디 변경
     * @param user_id
     * @param updateIdRequest
     * @param response
     */
    @Override
    @Transactional
    public void updateByUserId(Long user_id, UpdateIdRequest updateIdRequest, HttpServletResponse response) {

        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        String updateUsername = updateIdRequest.getUpdateUsername();

        User userIdCheck = myPageRepository.findByUsername(updateUsername);

        if(userIdCheck == null){    // 중복 X
            user.updateUsername(updateUsername);

            // accessToken 삭제
            Cookie accessCookie = new Cookie("accessToken", null);
            accessCookie.setMaxAge(0);
            accessCookie.setPath("/");
            response.addCookie(accessCookie);

            // refreshToken 삭제
            Cookie refreshCookie = new Cookie("refreshToken", null);
            refreshCookie.setMaxAge(0);
            refreshCookie.setPath("/");
            response.addCookie(refreshCookie);
        } else {
            throw new BaseException(DUPLICATE_ID); // 중복 O(중복된 아이디가 있습니다.)
        }
    }
}
