package teamproject.backend.user;

import teamproject.backend.domain.User;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.LoginRequest;
import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

public interface UserService {

    public Long join(JoinRequest dto);

    public boolean checkIdDuplicate(String username);

    public LoginResponse login(LoginRequest loginRequest, HttpServletResponse response);

    public void logout(HttpServletResponse response);

    public User checkUserHasLogin(Cookie[] cookies);
}
