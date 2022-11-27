//package teamproject.backend.user;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.transaction.annotation.Transactional;
//import teamproject.backend.user.dto.JoinRequest;
//import teamproject.backend.user.dto.LoginRequest;
//
//import javax.persistence.EntityManager;
//
//import static org.springframework.boot.test.context.SpringBootTest.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@Transactional
//@AutoConfigureMockMvc
//@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
//public class UserControllerTest {
//
//    @Autowired
//    private MockMvc mvc;
//
//    @Autowired
//    private UserServiceImpl userService;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    @BeforeEach
//    public void init() {
//        entityManager.createNativeQuery("ALTER TABLE user AUTO_INCREMENT = 1").executeUpdate(); // mySQL
//    }
//
//    @Test
//    public void before() throws Exception {
//        // given
//        JoinRequest joinReqDto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");
//        String content = new ObjectMapper().writeValueAsString(joinReqDto);
//
//        // when
//        mvc.perform(post("/user/join")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)
//                .accept(MediaType.APPLICATION_JSON)
//                .characterEncoding("UTF-8")
//        );
//    }
//
//    @Test
//    public void join_Test() throws Exception {
//        // given
//        JoinRequest joinReqDto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");
//        String content = new ObjectMapper().writeValueAsString(joinReqDto);
//
//        // when
//        ResultActions resultActions = mvc.perform(post("/user/join")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)
//                .accept(MediaType.APPLICATION_JSON)
//                .characterEncoding("UTF-8")
//        );
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("code").value("1000"))
//                .andExpect(jsonPath("message").value("회원가입에 성공했습니다."))
//                .andDo(MockMvcResultHandlers.print());
//    }
//
//    @Test
//    public void join_중복Test() throws Exception {
//        // given
//        before();
//
//        JoinRequest joinReqDto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");
//        String content = new ObjectMapper().writeValueAsString(joinReqDto);
//
//        // when
//        ResultActions resultActions = mvc.perform(post("/user/join")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)
//                .accept(MediaType.APPLICATION_JSON)
//                .characterEncoding("UTF-8")
//        );
//
//        // then
//        resultActions.andExpect(status().isBadRequest())
//                .andExpect(jsonPath("code").value("3001"))
//                .andExpect(jsonPath("message").value("중복된 아이디가 있습니다."))
//                .andDo(MockMvcResultHandlers.print());
//    }
//
//    @Test
//    public void login_Test() throws Exception {
//        // given
//        before();
//        LoginRequest loginRequest = new LoginRequest("test1234", "test1234", true);
//        String content = new ObjectMapper().writeValueAsString(loginRequest);
//
//        // when
//        ResultActions resultActions = mvc.perform(post("/user/login")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)
//                .accept(MediaType.APPLICATION_JSON)
//                .characterEncoding("UTF-8")
//        );
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("code").value("1000"))
//                .andExpect(jsonPath("message").value("로그인에 성공했습니다."))
//                .andExpect(jsonPath("result.id").value(1))
//                .andDo(MockMvcResultHandlers.print());
//    }
//
//    @Test
//    public void logout_Test() throws Exception {
//        // given
//        before();
//        LoginRequest loginRequest = new LoginRequest("test1234", "test1234", true);
//        String content = new ObjectMapper().writeValueAsString(loginRequest);
//
//        // when
//        mvc.perform(post("/user/login")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)
//                .accept(MediaType.APPLICATION_JSON)
//                .characterEncoding("UTF-8")
//        );
//
//        // then
//        mvc.perform(get("/user/logout"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("code").value("1000"))
//                .andExpect(jsonPath("message").value("로그아웃에 성공했습니다."));
//
//    }
//}
