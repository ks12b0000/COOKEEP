package teamproject.backend.mypage;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.*;
import teamproject.backend.user.UserRepository;
import teamproject.backend.utils.SHA256;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@Transactional
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class MyPageControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("마이페이지 조회")
    void myPageUserInfo() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));

        // when
        ResultActions completeResult = mvc.perform(get("/auth/user/mypage?user_id=" + user.getId()));
        ResultActions failResult = mvc.perform(get("/auth/user/mypage?user_id=" + 0));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("유저 정보를 성공적으로 가져왔습니다."));

        failResult.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3005"))
                .andExpect(jsonPath("message").value("존재하지 않는 유저입니다."));
    }

    @Test
    @DisplayName("유저 정보 수정 시 비밀번호 확인")
    void checkPassword() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", SHA256.encrypt("test1234", null), null));
        CheckPwRequest completeRequest = new CheckPwRequest("test1234");
        String content = new ObjectMapper().writeValueAsString(completeRequest);

        CheckPwRequest failRequest = new CheckPwRequest("failpass1");
        String content2 = new ObjectMapper().writeValueAsString(failRequest);

        // when
        ResultActions completeResult = mvc.perform(post("/auth/user/check/password/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        ResultActions failResult = mvc.perform(post("/auth/user/check/password/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content2)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("비밀번호 확인에 성공했습니다."));

        failResult.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3006"))
                .andExpect(jsonPath("message").value("비밀번호를 확인해주세요."));
    }

    @Test
    @DisplayName("유저 비밀번호 변경")
    void updatePassword() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));
        UpdatePwRequest completeRequest = new UpdatePwRequest("updatepass123");
        String content = new ObjectMapper().writeValueAsString(completeRequest);

        // when
        ResultActions completeResult = mvc.perform(put("/auth/user/update/password/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("비밀번호 변경에 성공했습니다."));
    }

    @Test
    @DisplayName("유저 아이디 변경")
    void updateId() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));
        UpdateIdRequest completeRequest = new UpdateIdRequest("updatename12");
        String content = new ObjectMapper().writeValueAsString(completeRequest);

        userRepository.save(new User("failname12", "failtestNick", "failtest@gmail.com", "test1234", null));
        UpdateIdRequest failRequest = new UpdateIdRequest("failname12");
        String content2 = new ObjectMapper().writeValueAsString(failRequest);

        // when
        ResultActions completeResult = mvc.perform(put("/auth/user/update/username/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        ResultActions failResult = mvc.perform(put("/auth/user/update/username/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content2)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("아이디 변경에 성공했습니다."));

        failResult.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3001"))
                .andExpect(jsonPath("message").value("중복된 아이디가 있습니다."));
    }

    @Test
    @DisplayName("유저 이메일 변경")
    void updateEmail() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));
        UpdateEmailRequest completeRequest = new UpdateEmailRequest("updatename12@gmail.com");
        String content = new ObjectMapper().writeValueAsString(completeRequest);

        userRepository.save(new User("failname12", "failtestNick", "failtest@gmail.com", "test1234", null));
        UpdateEmailRequest failRequest = new UpdateEmailRequest("failtest@gmail.com");
        String content2 = new ObjectMapper().writeValueAsString(failRequest);

        // when
        ResultActions completeResult = mvc.perform(put("/auth/user/update/email/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        ResultActions failResult = mvc.perform(put("/auth/user/update/email/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content2)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("이메일 변경에 성공했습니다."));

        failResult.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3004"))
                .andExpect(jsonPath("message").value("중복된 이메일이 있습니다."));
    }

    @Test
    @DisplayName("유저 닉네임 변경")
    void updateNickname() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));
        UpdateNicknameRequest completeRequest = new UpdateNicknameRequest("updateNick");
        String content = new ObjectMapper().writeValueAsString(completeRequest);

        userRepository.save(new User("failname12", "failNick", "failtest@gmail.com", "test1234", null));
        UpdateNicknameRequest failRequest = new UpdateNicknameRequest("failNick");
        String content2 = new ObjectMapper().writeValueAsString(failRequest);

        // when
        ResultActions completeResult = mvc.perform(put("/auth/user/update/nickname/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        ResultActions failResult = mvc.perform(put("/auth/user/update/nickname/{user_id}", user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(content2)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("닉네임 변경에 성공했습니다."));

        failResult.andExpect(status().isBadRequest())
                .andExpect(jsonPath("code").value("3007"))
                .andExpect(jsonPath("message").value("중복된 닉네임이 있습니다."));
    }

    @Test
    @DisplayName("회원 탈퇴")
    void userDelete() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));
        user.setImageURL("test123");

        // when
        ResultActions completeResult = mvc.perform(delete("/auth/user/delete/{user_id}", user.getId()));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("회원 탈퇴에 성공했습니다."));
    }

    @Test
    @DisplayName("유저가 좋아요 누른 글 조회")
    void likeByUser() throws Exception {
        // given
        User user = userRepository.save(new User("test1234", "test122", "test1234@gmail.com", "test1234", null));

        // when
        ResultActions completeResult = mvc.perform(get("/auth/user/like/list/{user_id}", user.getId()));

        // then
        completeResult.andExpect(status().isOk())
                .andExpect(jsonPath("code").value("1000"))
                .andExpect(jsonPath("message").value("좋아요 누른 글 목록을 불러왔습니다."));
    }
}
