package teamproject.backend.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.user.dto.FindIdRequest;
import teamproject.backend.user.dto.FindPwRequest;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.LoginRequest;
import static org.springframework.boot.test.context.SpringBootTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
public class UserControllerTest {

    @Autowired
    private MockMvc mvc;

//    @Autowired
//    private UserServiceImpl userService;

    @DisplayName("테스트에 필요한 유저 저장")
    public void before() throws Exception {
        // given
        JoinRequest joinReqDto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");
        String content = new ObjectMapper().writeValueAsString(joinReqDto);

        // when
        mvc.perform(post("/user/join")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );
    }

    @Test
    @DisplayName("유저 회원가입")
    void join() throws Exception {
        // given
        JoinRequest joinReqDto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");
        String content = new ObjectMapper().writeValueAsString(joinReqDto);

        // when
        ResultActions resultActions = mvc.perform(post("/user/join")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        // then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("회원가입에 성공했습니다."));
    }

    @Test
    @DisplayName("아이디 중복체크")
    void checkIdDuplicate() throws Exception {
        // given
        before();

        String userName = "test1234";
        String userName2 = "test123455";

        // when
        ResultActions resultActions = mvc.perform(get("/user/duplicate?username=" + userName));
        ResultActions resultActions2 = mvc.perform(get("/user/duplicate?username=" + userName2));

        // then
        resultActions.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3001"))
                .andExpect(jsonPath("message").value("중복된 아이디가 있습니다."));

        resultActions2.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("사용 가능한 아이디 입니다."));
    }

    @Test
    @DisplayName("유저 로그인")
    void login() throws Exception {
        // given
        before();
        LoginRequest loginRequest = new LoginRequest("test1234", "test1234", true);
        String content = new ObjectMapper().writeValueAsString(loginRequest);

        // when
        ResultActions resultActions = mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        // then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("로그인에 성공했습니다."));
    }

    @Test
    @DisplayName("유저 로그아웃")
    void logout() throws Exception {
        // given
        before();
        LoginRequest loginRequest = new LoginRequest("test1234", "test1234", true);
        String content = new ObjectMapper().writeValueAsString(loginRequest);

        // when
        mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        // then
        mvc.perform(get("/user/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("로그아웃에 성공했습니다."));

    }

    @Test
    @DisplayName("아이디 찾기")
    void findByUserId() throws Exception {
        // given
        before();
        FindIdRequest findIdRequest = new FindIdRequest("test1234@gmail.com");
        String content = new ObjectMapper().writeValueAsString(findIdRequest);

        // when
        ResultActions resultActions = mvc.perform(post("/user/find/id")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        // then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("아이디 찾기에 성공했습니다."))
                .andExpect(jsonPath("result.username").value("test1234"));
    }

    @Test
    @DisplayName("이메일 중복체크")
    void checkEmailDuplicate() throws Exception {
        // given
        before();

        String userEmail = "test1234@gmail.com";
        String userEmail2 = "test123455@gmail.com";

        // when
        ResultActions resultActions = mvc.perform(get("/user/email/duplicate?email=" + userEmail));
        ResultActions resultActions2 = mvc.perform(get("/user/email/duplicate?email=" + userEmail2));

        // then
        resultActions.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3004"))
                .andExpect(jsonPath("message").value("중복된 이메일이 있습니다."));

        resultActions2.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("사용 가능한 이메일 입니다."));
    }

    @Test
    @DisplayName("비밀번호 찾기")
    void findByUserPw() throws Exception {
        // given
        before();
        FindPwRequest findPwRequest = new FindPwRequest("test1234","test1234@gmail.com");
        String content = new ObjectMapper().writeValueAsString(findPwRequest);

        // when
        ResultActions resultActions = mvc.perform(post("/user/find/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        // then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("비밀번호 찾기에 성공했습니다."));
    }
}
