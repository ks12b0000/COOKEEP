package teamproject.backend.user;

import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.HttpServletResponse;

public interface NaverUserService {

    public LoginResponse login(String code, String state, HttpServletResponse response);

}
