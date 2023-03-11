package teamproject.backend.user;

import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface UserService {

    public Long join(JoinRequest dto);

    public boolean checkIdDuplicate(String username);

    public LoginResponse login(LoginRequest loginRequest, HttpServletResponse response);

    public void logout(HttpServletResponse response);

    public User checkUserHasLogin(Cookie[] cookies);

    public FindIdResponse findByUserId(FindIdRequest findIdRequest);

    public boolean checkEmailDuplicate(String email);

    public FindPwResponse findByUserPw(FindPwRequest findPwRequest);

    void uploadImage(Long userId, MultipartFile image) throws IOException;
}
