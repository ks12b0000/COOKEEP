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
public class NaverUserServiceImpl implements NaverUserService {

    private final JwtService jwtService;
    private final CookieService cookieService;
    private final SocialUserService userService;

    private String frontHost = "https://localhost:3000";
    private final String tokenHost = "https://nid.naver.com/oauth2.0/token";
    private final String userInfoHost = "https://openapi.naver.com/v1/nid/me";
    @Value("${NAVER_API_ID}")
    private String NAVER_API_ID;
    @Value("${NAVER_API_SECRET}")
    private String NAVER_API_SECRET;
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

    private class NaverUser {

        private String username; // 아이디
        private String email;

        protected NaverUser(String username, String email){
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
    public LoginResponse login(String code, String state, HttpServletResponse response) {
        this.redirectionUrl  = frontHost + "/callback/naver";

        // 인가코드로 네이버의 토큰(access) 발급받기
        Token token = getTokens(code, state);

        // user 조회
        SocialUserInfo userInfo = getUser(token.getAccessToken());

        // 토큰 발급
        String accessToken = jwtService.createAccessToken(userInfo.getUsername());

        // 쿠키 발급
        ResponseCookie accessCookie = cookieService.createAccessCookie(accessToken, false);
        response.addHeader("Set-Cookie", accessCookie.toString());

        return new LoginResponse(userInfo.getId());
    }

    // 네이버의 access토큰 받기
    private Token getTokens(String code, String state){
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
            sb.append("&client_id="+NAVER_API_ID);
            sb.append("&client_secret="+NAVER_API_SECRET);
            sb.append("&code=" + code);
            sb.append("&state=" + state);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            // 200 아닐경우 예외처리
            if(responseCode != HttpStatus.OK.value()){
                throw new BaseException(NAVER_GET_USER_INFO_FAIL);
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
            throw new BaseException(NAVER_GET_TOKEN_FAIL);
        }
    }

    // 네이버로부터 user 조회
    private SocialUserInfo getUser(String accessToken){

        NaverUser naverUser = getUserInfo(accessToken);

        Long userId = userService.checkUserHasJoin(naverUser.getUsername());

        // 해당하는 사용자가 없으면 자동으로 회원가입 진행
        if(userId == -1L){
            return userService.joinBySocial(naverUser.getUsername(), naverUser.getEmail());
        }

        return new SocialUserInfo(userId, naverUser.getUsername(), naverUser.getEmail());
    }

    // 사용자 정보 가져오기
    private NaverUser getUserInfo(String accessToken){
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
                throw new BaseException(NAVER_GET_USER_INFO_FAIL);
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
            String username = element.getAsJsonObject().get("response").getAsJsonObject().get("id").getAsString();
            String email = element.getAsJsonObject().get("response").getAsJsonObject().get("email").getAsString();

            NaverUser naverUser = new NaverUser(username, email);

            br.close();

            return naverUser;
        } catch (BaseException e){
            throw e;
        } catch (IOException e) {
            e.printStackTrace();
            throw new BaseException(NAVER_GET_USER_INFO_FAIL);
        }
    }
}
