package teamproject.backend.user;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
public class GoogleUserServiceImpl implements GoogleUserService {

    private final JwtService jwtService;
    private final CookieService cookieService;
    private final SocialUserService userService;

    private String frontHost = "http://localhost:3000";
    private final String tokenHost = "https://oauth2.googleapis.com/token";
    private final String userInfoHost = "https://www.googleapis.com/oauth2/v1/userinfo";
    @Value("${GOOGLE_API_ID}")
    private String GOOGLE_API_ID;
    @Value("${GOOGLE_API_SECRET}")
    private String GOOGLE_API_SECRET;
    private String redirectionUrl;

    private class Token{

        private String accessToken;

        protected Token(String access){
            this.accessToken = access;
        }

        protected String getAccessToken() {
            return accessToken;
        }
    }

    private class GoogleUser {

        private String username; // 아이디
        private String email;

        protected GoogleUser(String username, String email){
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
        this.redirectionUrl  = frontHost + "/callback/google";

        // 인가코드로 네이버의 토큰(access) 발급받기
        Token token = getTokens(code);

        // user 조회
        SocialUserInfo userInfo = getUser(token.getAccessToken());

        // 토큰 발급
        String accessToken = jwtService.createAccessToken(userInfo.getUsername());

        // 쿠키 발급
        ResponseCookie accessCookie = cookieService.createAccessCookie(accessToken, false);
        response.addHeader("Set-Cookie", accessCookie.getValue());
        response.setHeader("accessToken", accessCookie.getValue());

        return new LoginResponse(userInfo.getId());
    }

    // 구글의 access토큰 받기
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
            sb.append("client_id="+ GOOGLE_API_ID);
            sb.append("&client_secret="+ GOOGLE_API_SECRET);
            sb.append("&code=" + code);
            sb.append("&redirect_uri="+ redirectionUrl);
            sb.append("&grant_type=authorization_code");
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            // 200 아닐경우 예외처리
            if(responseCode != HttpStatus.OK.value()){
                throw new BaseException(GOOGLE_GET_USER_INFO_FAIL);
            }

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            // 응답 바디에서 토큰값 읽어오기
            String accessToken = element.getAsJsonObject().get("access_token").getAsString();

            Token token = new Token(accessToken);

            br.close();
            bw.close();

            return token;
        }catch (IOException e) {
            e.printStackTrace();
            throw new BaseException(GOOGLE_GET_TOKEN_FAIL);
        }
    }

    // 구글로부터 user 조회
    private SocialUserInfo getUser(String accessToken){

        GoogleUser googleUser = getUserInfo(accessToken);

        Long userId = userService.checkUserHasJoin(googleUser.getUsername());

        // 해당하는 사용자가 없으면 자동으로 회원가입 진행
        if(userId == -1L){
            return userService.joinBySocial(googleUser.getUsername(), googleUser.getEmail());
        }

        return new SocialUserInfo(userId, googleUser.getUsername(), googleUser.getEmail());
    }

    // 사용자 정보 가져오기
    private GoogleUser getUserInfo(String accessToken){
        try{
            URL url = new URL(userInfoHost);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
            conn.setDoOutput(true); // 서버로부터 받아오는 값이 있다면 ture

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            // 200 아닐경우 예외처리 필요
            if(responseCode != HttpStatus.OK.value()){
                throw new BaseException(GOOGLE_GET_USER_INFO_FAIL);
            }

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            // 응답바디에서 사용자 정보 꺼내오기
            String username = element.getAsJsonObject().get("id").getAsString();
            String email = element.getAsJsonObject().get("email").getAsString();

            GoogleUser googleUser = new GoogleUser(username, email);

            br.close();

            return googleUser;
        } catch (BaseException e){
            throw e;
        } catch (IOException e) {
            e.printStackTrace();
            throw new BaseException(GOOGLE_GET_USER_INFO_FAIL);
        }
    }
}
