package teamproject.backend.user;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.dto.LoginResponse;
import teamproject.backend.user.dto.SocialUserInfo;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class KakaoUserServiceImpl implements KakaoUserService {

    private final JwtService jwtService;
    private final CookieService cookieService;
    private final SocialUserService userService;

    private String frontHost = "http://localhost:3000";
    private final String tokenHost = "https://kauth.kakao.com/oauth/token";
    private final String userInfoHost = "https://kapi.kakao.com/v2/user/me";
    @Value("${KAKAO_API_KEY}")
    private String KAKAO_API_KEY;
    private String redirectionUrl;

    private class Token{

        private String accessToken;
        private String refreshToken;

        protected Token(String access, String refresh){
            this.accessToken = access;
            this.refreshToken = refresh;
        }

        protected String getAccessToken() {
            return accessToken;
        }

        protected String getRefreshToken() {
            return refreshToken;
        }
    }

    private class KaKaoUser{

        private String username; // 아이디
        private String email;

        protected KaKaoUser(String username, String email){
            this.username = username;
            this.email = email;
        }

        public String getUsername() {
            return username;
        }

        public String getEmail() {
            return email;
        }
    }
    @Override
    public LoginResponse login(String code, HttpServletResponse response) {
        this.redirectionUrl  = frontHost + "/callback/kakao";

        log.info("frontHost ={} ", frontHost);
        log.info("redirectionUrl ={} ", redirectionUrl);

        // 인가코드로 카카오의 토큰(access, refresh) 발급받기
        Token token = getTokens(code);

        log.info("token.getAccessToken() ={} ", token.getAccessToken());
        log.info("redirectionUrl ={} ", redirectionUrl);

        // user 조회
        SocialUserInfo userInfo = getUser(token.getAccessToken());

        // 토큰 발급
        String accessToken = jwtService.createAccessToken(userInfo.getUsername());

        // 쿠키 발급
        Cookie accessCookie = cookieService.createAccessCookie(accessToken, true);
        response.addCookie(accessCookie);

        return new LoginResponse(userInfo.getId());
    }

    // 카카오의 access토큰과 refresh토큰 받기
    private Token getTokens(String code){
        try{
            URL url = new URL(tokenHost);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+KAKAO_API_KEY);
            sb.append("&redirect_uri="+redirectionUrl);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : {}" , responseCode);
            log.info(conn.getResponseMessage());

            // 200 아닐경우 예외처리 필요

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.info("result ={} " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            // 응답 바디에서 토큰값 읽어오기
            String accessToken = element.getAsJsonObject().get("access_token").getAsString();
            String refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            Token token = new Token(accessToken, refreshToken);

            br.close();
            bw.close();

            return token;
        }catch (IOException e) {
            e.printStackTrace();
            throw new BaseException(KAKAO_GET_TOKEN_FAIL);
        }
    }

    // 카카오로부터 user 조회
    private SocialUserInfo getUser(String accessToken){

        KaKaoUser kakaoUser = getUserInfo(accessToken);

        Long userId = userService.checkUserHasJoin(kakaoUser.getUsername());
        // 해당하는 사용자가 없으면 자동으로 회원가입 진행
        if(userId == -1L){
            log.info("회원가입이 되지 않은 유저의 카카오 로그인 발생. 회원가입 진행: idx={}", kakaoUser.getUsername());
            return userService.joinBySocial(kakaoUser.getUsername(), kakaoUser.getEmail());
        }

        return new SocialUserInfo(userId, kakaoUser.getUsername(), kakaoUser.getEmail());
    }

    // 사용자 정보 가져오기
    private KaKaoUser getUserInfo(String accessToken){
        try{
            URL url = new URL(userInfoHost);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            conn.setDoOutput(true); // 서버로부터 받아오는 값이 있다면 ture

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.trace("responseCode : {}" , responseCode);

            // 200 아닐경우 예외처리 필요
            if(responseCode != HttpStatus.OK.value()){
                throw new BaseException(KAKAO_GET_USER_INFO_FAIL);
            }

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.trace("response body : {}", result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            // 응답바디에서 사용자 정보 꺼내오기
            String username = element.getAsJsonObject().get("id").toString();
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            String email = "";
            if(hasEmail){
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            } else {
                new BaseException(KAKAO_LOGIN_FAIL_EMAIL);
            }

            KaKaoUser kaKaoUser = new KaKaoUser(username, email);

            br.close();

            return kaKaoUser;
        } catch (BaseException e){
            log.error("카카오 로그인 중 예상치못한 에러: {}", e.getMessage());
            throw e;
        } catch (IOException e) {
            e.printStackTrace();
            log.error("카카오 로그인 중 예상치못한 에러: {}", KAKAO_GET_USER_INFO_FAIL.getMessage());
            throw new BaseException(KAKAO_GET_USER_INFO_FAIL);
        }
    }
}
