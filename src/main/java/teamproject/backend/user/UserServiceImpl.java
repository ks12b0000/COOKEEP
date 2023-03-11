package teamproject.backend.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.domain.Notification;
import teamproject.backend.domain.User;
import teamproject.backend.notification.NotificationRepository;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.dto.*;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;
import teamproject.backend.utils.S3.S3DAO;
import teamproject.backend.utils.SHA256;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Optional;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, SocialUserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final NotificationRepository notificationRepository;
    private final S3DAO s3DAO;

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
        String salt = SHA256.getSalt();
        String nickname = getRandomNickname();
        if(nickname == null) nickname = username;

        password = SHA256.encrypt(password, salt);

        if (checkIdDuplicate(username)){}

        User user = new User(username, nickname, email, password, salt);

        userRepository.save(user);
        notificationSave(user);

        return user.getId();
    }

    // 소셜 로그인 유저의 회원가입
    @Override
    @Transactional
    public SocialUserInfo joinBySocial(String username, String email){
        
        checkEmailDuplicate(email);

        User user = new User(username, email, username);

        userRepository.save(user);

        SocialUserInfo userInfo = new SocialUserInfo(user.getId(), user.getUsername(), user.getEmail());
        notificationSave(user);

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

        User user = userRepository.findByUsername(username);

        if(user == null) {
            throw new BaseException(LOGIN_USER_NOT_EXIST);
        }

        password = SHA256.encrypt(password, user.getSalt()); // 비번 암호화

        user = userRepository.findByUsernameAndPassword(username, password);

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

        LoginResponse loginResponse = new LoginResponse(user.getId(), user.getUsername());

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
        Cookie refreshCookie = cookieService.findCookie("refreshToken", cookies);

        if (accessCookie == null && refreshCookie == null) {
            throw new BaseException(JWT_TOKEN_INVALID);
        }

        String username = null;
        String token;
        if(accessCookie != null){
            token = accessCookie.getValue();
            username = jwtService.getUsernameByJwt(token);
        }
        else if(refreshCookie != null){
            token = refreshCookie.getValue();
            username = jwtService.getUsernameByJwt(token);
        }

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
    public FindIdResponse findByUserId(FindIdRequest findIdRequest) {

        String email = findIdRequest.getEmail();

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new BaseException(USER_NOT_EXIST);
        }

        FindIdResponse findIdResponse = new FindIdResponse(user.getUsername());

        return findIdResponse;
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

    /**
     * 비밀번호 찾기
     * @param findPwRequest
     */
    @Override
    @Transactional
    public FindPwResponse findByUserPw(FindPwRequest findPwRequest) {

        String username = findPwRequest.getUsername();
        String email = findPwRequest.getEmail();

        User user = userRepository.findByUsernameAndEmail(username, email);

        if (user == null) {
            throw new BaseException(USER_NOT_EXIST);
        }

        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String password = "";

        /* 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 조합 */
        int idx = 0;
        for(int i = 0; i < 10; i++){
            idx = (int) (charSet.length * Math.random());
            password += charSet[idx];
        }

        String salt = user.getSalt();
        String encPassword = SHA256.encrypt(password,salt);
        user.updatePassword(encPassword);

        FindPwResponse findPwResponse = new FindPwResponse(password);

        return findPwResponse;
    }

    private void notificationSave(User user) {
        String message = "마이페이지에서 새로운 닉네임을 설정해주세요!";
        String url = "https://www.teamprojectvv.shop/mypage/" + user.getId();
        Notification notification = new Notification(user, message, url);
        notificationRepository.save(notification);
    }

    private String getRandomNickname(){
        String nickname = null;

        for(int i = 0; i < 100; i++){
            String random = RandomNickName.get(15);
            if (!userRepository.existsUserByNickname(random)){
                nickname = random;
                break;
            }
        }

        return nickname;
    }

    @Override
    public void uploadImage(Long userId, MultipartFile image) throws IOException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(USER_NOT_EXIST);

        if(image == null && user.get().getImageURL() != null){
            user.get().setImageURL(null);
            s3DAO.delete(""+userId);
            return;
        }

        if(s3DAO.isExist(""+userId)){
            s3DAO.delete(""+userId);
        }
        s3DAO.upload(""+userId, image);

        user.get().setImageURL(s3DAO.getURL("" + userId));
    }
}
