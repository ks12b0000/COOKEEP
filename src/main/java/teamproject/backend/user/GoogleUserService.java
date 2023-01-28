package teamproject.backend.user;

import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.HttpServletResponse;

public interface GoogleUserService {

    public LoginResponse login(String code, HttpServletResponse response);

}
