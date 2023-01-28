package teamproject.backend.user;

import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.HttpServletResponse;

public interface KakaoUserService {

    public LoginResponse login(String code, HttpServletResponse response);

}
