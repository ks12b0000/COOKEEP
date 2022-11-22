package teamproject.backend.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ValidationSequence;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.LoginRequest;
import teamproject.backend.user.dto.LoginResponse;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * 회원가입
     * [POST] /user/join
     * @param joinRequest
     * @return
     */
    @CrossOrigin
    @PostMapping("/user/join")
    public BaseResponse join(@Validated(ValidationSequence.class) @RequestBody JoinRequest joinRequest) {

        userService.join(joinRequest);

        return new BaseResponse("회원가입에 성공했습니다.");
    }

    /**
     * 아이디 중복체크
     * [GET] /user/duplicate?username=
     * @param username
     * @return
     */
    @CrossOrigin
    @GetMapping("/user/duplicate")
    public BaseResponse checkIdDuplicate(String username) {

        userService.checkIdDuplicate(username);

        return new BaseResponse("사용 가능한 아이디 입니다.");
    }

    /**
     * 로그인
     * [POST] /user/login
     * @param loginRequest
     * @param response
     * @return loginResponse
     */
    @CrossOrigin
    @PostMapping("/user/login")
    public BaseResponse<LoginResponse> login(@Validated(ValidationSequence.class) @RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        LoginResponse loginResponse = userService.login(loginRequest, response);

        return new BaseResponse<>("로그인에 성공했습니다.",loginResponse);
    }
}
