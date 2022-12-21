package teamproject.backend.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.dto.*;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;
import teamproject.backend.utils.SHA256;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, SocialUserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String from;

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
        ResponseCookie accessCookie = cookieService.createAccessCookie(accessToken, isAutoLogin);
        ResponseCookie refreshCookie = cookieService.createRefreshCookie(refreshToken, isAutoLogin);

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());

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

    // 로그인 된 유저인지 확인
    @Override
    public User checkUserHasLogin(Cookie[] cookies){
        Cookie accessCookie = cookieService.findCookie("accessToken", cookies);

        String token = accessCookie.getValue();
        String username = jwtService.getUsernameByJwt(token);

        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new BaseException(USER_NOT_EXIST);
        }

        return user;
    }

    /**
     * 아이디 찾기
     * @param findIdRequest
     */
    @Override
    @Transactional
    public void findByUserId(FindIdRequest findIdRequest) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        String email = findIdRequest.getEmail();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new BaseException(USER_NOT_EXIST);
        }

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("[오늘 뭐먹지] 아이디 찾기 안내");
            mimeMessageHelper.setText("<div style='text-align: center;'><h2>안녕하세요. 오늘 뭐먹지 입니다.</h2> <p>귀하께서 요청하신 아이디 찾기 수신을 위해 발송된 메일입니다.</p> <p>유저 아이디는 <Strong>" + user.getUsername() + "</Strong> 입니다.</p> <p>감사합니다.</p></div>", true);

            javaMailSender.send(mimeMessage);
            log.info("sent username: {}", user.getUsername());
        } catch (MessagingException e) {
            log.error("[EmailService.send()] error {}", e.getMessage());
            throw new BaseException(EMAIL_ERROR);
        }
    }

    /**
     * 이메일 중복체크
     * @param email
     * @return
     */
    @Override
    public boolean checkEmailDuplicate(String email) {
        User user = userRepository.findByEmail(email);

        if(user == null){
            return false; // 중복 X
        } else {
            throw new BaseException(DUPLICATE_EMAIL); // 중복 O
        }
    }
}
