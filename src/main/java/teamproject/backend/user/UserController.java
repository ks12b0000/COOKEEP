package teamproject.backend.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.domain.User;
import teamproject.backend.response.*;
import teamproject.backend.user.dto.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Users", description = "User API")
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
    @Operation(summary = "회원가입", description = "회원가입 API", responses = {
            @ApiResponse(responseCode = "1000", description = "회원가입에 성공했습니다.", content = @Content(schema = @Schema(implementation = BaseResponse.class))),
            @ApiResponse(responseCode = "2001", description = "아이디를 입력하세요.")
    })
    @Tag(name = "Users")
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
    @Tag(name = "Users")
    @GetMapping("/user/duplicate")
    public BaseResponse<GetUserSameRes> checkIdDuplicate(@RequestParam String username) {

        boolean idDuplicate = userService.checkIdDuplicate(username);

        GetUserSameRes res = new GetUserSameRes(idDuplicate);
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
    @Tag(name = "Users")
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
    @Tag(name = "Users")
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
    @Tag(name = "Users")
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
    @Tag(name = "Users")
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
    @Tag(name = "Users")
    @GetMapping("/auth/user/login")
    public BaseResponse loginCheck(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();
        User user = userService.checkUserHasLogin(cookies);
        LoginResponse loginResponse = new LoginResponse(user.getId(), user.getUsername(), user.getImageURL());
        return new BaseResponse("로그인 된 유저입니다.", loginResponse);
    }

    /**
     * 로그아웃
     * [GET] /user/logout
     * @param response
     * @return
     */
    @Tag(name = "Users")
    @GetMapping("/user/logout")
    public BaseResponse logout(HttpServletResponse response) {

        userService.logout(response);

        return new BaseResponse("로그아웃에 성공했습니다.");
    }

    /**
     * 아이디 찾기
     * [POST] /user/find/id
     * @param findIdRequest
     * @return
     */
    @Tag(name = "Users")
    @PostMapping("/user/find/id")
    public BaseResponse findByUserId(@Validated(ValidationSequence.class) @RequestBody FindIdRequest findIdRequest) {

        FindIdResponse findIdResponse = userService.findByUserId(findIdRequest);

        return new BaseResponse("아이디 찾기에 성공했습니다.", findIdResponse);
    }

    /**
     * 이메일 중복체크
     * [GET] /user/email/duplicate?email=
     *
     * @param email
     * @return
     */
    @Tag(name = "Users")
    @GetMapping("/user/email/duplicate")
    public BaseResponse<GetUserSameRes> checkEmailDuplicate(@RequestParam String email) {

        boolean emailDuplicate = userService.checkEmailDuplicate(email);

        GetUserSameRes res = new GetUserSameRes(emailDuplicate);
        return new BaseResponse<>("사용 가능한 이메일 입니다.", res);
    }

    /**
     * 비밀번호 찾기
     * [POST] /user/find/password
     * @param findPwRequest
     * @return
     */
    @Tag(name = "Users")
    @PostMapping("/user/find/password")
    public BaseResponse findByUserPw(@Validated(ValidationSequence.class) @RequestBody FindPwRequest findPwRequest) {

        FindPwResponse findPwResponse = userService.findByUserPw(findPwRequest);

        return new BaseResponse("비밀번호 찾기에 성공했습니다.", findPwResponse);
    }

    @Tag(name = "Users")
    @GetMapping("/auth/user/image/{user_id}")
    public BaseResponse findUserImage(@PathVariable Long user_id){
        FindUserImageResponse response = userService.findUserImageByUserId(user_id);
        return new BaseResponse("유저 이미지를 조회했습니다.", response);
    }
}
