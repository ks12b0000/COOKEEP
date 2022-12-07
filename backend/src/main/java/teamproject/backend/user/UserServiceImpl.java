package teamproject.backend.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.LoginRequest;
import teamproject.backend.user.dto.LoginResponse;
import teamproject.backend.user.dto.SocialUserInfo;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;
import teamproject.backend.utils.SHA256;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, SocialUserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;

    /**
     * 회원가입
     * @param joinRequest
     * @return user.getId()
     */
    @Transactional
    @Override
    public Long join(JoinRequest joinRequest) {
        String username = joinRequest.getUsername();
        String email = joinRequest.getEmail();
        String password = joinRequest.getPassword();

        password = SHA256.encrypt(password);

        if (checkIdDuplicate(username)){}

        User user = new User(username, email, password);
        userRepository.save(user);

        return user.getId();
    }

    // 소셜 로그인 유저의 회원가입
    @Override
    @Transactional
    public SocialUserInfo joinBySocial(String username, String email){

        User user = new User(username, email, username);

        userRepository.save(user);

        SocialUserInfo userInfo = new SocialUserInfo(user.getId(), user.getUsername(), user.getEmail());

        return userInfo;
    }

    // 회원가입된 유저인지 확인
    @Override
    public Long checkUserHasJoin(String username){

        User user = userRepository.findByUsername(username);

        if(user == null){
            return -1L; // 회원가입 안됨
        }
        else {
            return user.getId(); // 회원가입 됨.
        }
    }

    /**
     * 아이디 중복체크
     * @param username
     * @return
     */
    @Override
    public boolean checkIdDuplicate(String username) {
        User user = userRepository.findByUsername(username);

        if(user == null){
            return false; // 중복 X
        } else {
            throw new BaseException(DUPLICATE_ID); // 중복 O(중복된 아이디가 있습니다.)
        }
    }

    /**
     * 로그인
     * @param loginRequest
     * @param response
     * @return loginResponse
     */
    @Override
    public LoginResponse login(LoginRequest loginRequest, HttpServletResponse response){

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        boolean isAutoLogin = loginRequest.getAutoLogin(); // 자동 로그인 여부

        // 회원가입된 유저인지 확인
        password = SHA256.encrypt(password); // 비번 암호화
        User user = userRepository.findByUsernameAndPassword(username, password);

        // 해당하는 유저가 없음.(아이디, 또는 비밀번호가 일치하지 않습니다.)
        if(user == null) {
            throw new BaseException(LOGIN_USER_NOT_EXIST);
        }

        // 토큰 발급
        String accessToken = jwtService.createAccessToken(username);
        String refreshToken = jwtService.createRefreshToken(username);

        // 쿠키 발급
        Cookie accessCookie = cookieService.createAccessCookie(accessToken, isAutoLogin);
        Cookie refreshCookie = cookieService.createRefreshCookie(refreshToken, isAutoLogin);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        response.setHeader("accessToken", String.valueOf(accessCookie));
        response.setHeader("refreshToken", String.valueOf(refreshCookie));

        LoginResponse loginResponse = new LoginResponse(user.getId());

        return loginResponse;
    }

    /**
     * 로그아웃
     * @param response
     */
    @Override
    public void logout(HttpServletResponse response) {
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

}
