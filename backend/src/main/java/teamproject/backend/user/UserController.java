package teamproject.backend.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ValidationSequence;
import teamproject.backend.user.dto.GetUsernameSameRes;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.LoginRequest;
import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final KakaoUserService kakaoUserService;
    private final NaverUserService naverUserService;
    private final GoogleUserService googleUserService;

    /**
     * 회원가입
     * [POST] /user/join
     *
     * @param joinRequest
     * @return
     */
    @PostMapping("/user/join")
    public BaseResponse join(@Validated(ValidationSequence.class) @RequestBody JoinRequest joinRequest) {

        userService.join(joinRequest);

        return new BaseResponse("회원가입에 성공했습니다.");
    }

    /**
     * 아이디 중복체크
     * [GET] /user/duplicate?username=
     *
     * @param username
     * @return
     */
    @GetMapping("/user/duplicate")
    public BaseResponse<GetUsernameSameRes> checkIdDuplicate(String username) {

        boolean idDuplicate = userService.checkIdDuplicate(username);

        GetUsernameSameRes res = new GetUsernameSameRes(idDuplicate);
        return new BaseResponse<>("사용 가능한 아이디 입니다.", res);
    }

    /**
     * 로그인
     * [POST] /user/login
     *
     * @param loginRequest
     * @param response
     * @return loginResponse
     */
    @PostMapping("/user/login")
    public BaseResponse<LoginResponse> login(@Validated(ValidationSequence.class) @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        LoginResponse loginResponse = userService.login(loginRequest, response);

        return new BaseResponse<>("로그인에 성공했습니다.", loginResponse);
    }

    /**
     * 카카오 로그인
     * [GET] /user/login/kakao?code=
     *
     * @param code
     * @param response
     * @return
     */
    @GetMapping("/user/login/kakao")
    public BaseResponse<LoginResponse> kakaoLogin(@RequestParam String code, HttpServletResponse response){

        LoginResponse loginResponse = kakaoUserService.login(code, response);

        return new BaseResponse<>("카카오 로그인에 성공했습니다.", loginResponse);
    }

    /**
     * 네이버 로그인
     * [GET] /user/login/naver?code=&state=
     *
     * @param code
     * @param state
     * @param response
     * @return
     */
    @GetMapping("/user/login/naver")
    public BaseResponse<LoginResponse> naverLogin(@RequestParam String code, @RequestParam String state, HttpServletResponse response){

        LoginResponse loginResponse = naverUserService.login(code, state, response);

        return new BaseResponse<>("네이버 로그인에 성공했습니다.", loginResponse);
    }

    /**
     * 구글 로그인
     * [GET] /user/login/google?code=
     *
     * @param code
     * @param response
     * @return
     */
    @GetMapping("/user/login/google")
    public BaseResponse<LoginResponse> googleLogin(@RequestParam String code, HttpServletResponse response){

        LoginResponse loginResponse = googleUserService.login(code, response);

        return new BaseResponse<>("구글 로그인에 성공했습니다.", loginResponse);
    }

    /**
     * 로그인 여부 체크
     * [GET] /auth/user/login
     *
     * @return
     */
    @GetMapping("/auth/user/login")
    public BaseResponse loginCheck() {
        return new BaseResponse("로그인 된 유저입니다.");
    }

    /**
     * 로그아웃
     * [GET] /user/logout
     * @param response
     * @return
     */
    @GetMapping("/user/logout")
    public BaseResponse logout(HttpServletResponse response) {

        userService.logout(response);

        return new BaseResponse("로그아웃에 성공했습니다.");
    }
}
