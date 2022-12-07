package teamproject.backend.utils;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

import static teamproject.backend.utils.JwtData.ACCESS_COOKIE_EXPIRE_SECOND;
import static teamproject.backend.utils.JwtData.REFRESH_COOKIE_EXPIRE_SECOND;

@Service
public class CookieService {

    // 엑세스토큰 쿠키 생성
    public Cookie createAccessCookie(String accessToken, boolean autoLogin){

        Cookie cookie = new Cookie("accessToken", accessToken);
        cookie.setPath("/"); // 모든 경로에서 접근 가능하도록

        if(autoLogin) {
            cookie.setMaxAge(ACCESS_COOKIE_EXPIRE_SECOND);
            // maxAge 설정 안하면, 앱 끌시 쿠키 삭제됨.
        }

        return cookie;
    }

    // 리프레시토큰 쿠키 생성
    public Cookie createRefreshCookie(String refreshToken, boolean autoLogin){

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setPath("/"); // 모든 경로에서 접근 가능하도록

        if(autoLogin) {
            cookie.setMaxAge(REFRESH_COOKIE_EXPIRE_SECOND);
            // maxAge 설정 안하면, 앱 끌시 쿠키 삭제됨.
        }
        else {
            cookie.setMaxAge(0);
            // 자동로그인이 아니면 refresh쿠키 안만듦.
        }

        return cookie;
    }

    // 쿠키 찾기
    public Cookie findCookie(String key, Cookie[] cookies){
        if(cookies == null){
            return null;
        }

        for(Cookie cookie : cookies){
            if(cookie.getName().equals(key)){
                return cookie;
            }
        }
        return null;
    }
}
