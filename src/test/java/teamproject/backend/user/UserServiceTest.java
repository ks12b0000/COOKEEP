package teamproject.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.*;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;
import teamproject.backend.utils.SHA256;

import javax.servlet.http.HttpServletResponse;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Transactional
@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private UserRepository userRepository;
    @Mock
    HttpServletResponse response;
    @Spy
    SHA256 sha256;
    @Mock
    private JwtService jwtService;
    @Mock
    private CookieService cookieService;


    @Test
    @DisplayName("유저 회원가입")
    void join() {
        // given
        JoinRequest dto = new JoinRequest("test1234", "test1234@gmail.com", "test1234");

        User user = new User(dto.getUsername(), "testNick12", dto.getEmail(), dto.getPassword(), null);

        // stub 행동정의 (가설)
        when(userRepository.save(any())).thenReturn(user);

        // when
        Long userId = userService.join(dto);

        // then
        assertThat(userId).isEqualTo(user.getId());
    }

    @Test
    @DisplayName("소셜 회원가입")
    void social_Join() {
        // given
        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);

        // stub 행동정의 (가설)
        when(userRepository.save(any())).thenReturn(user);

        // when
        SocialUserInfo saveUser = userService.joinBySocial(user.getUsername(), user.getEmail());

        // then
        assertAll(
                () -> assertThat(saveUser.getId()).isEqualTo(user.getId()),
                () -> assertThat(saveUser.getUsername()).isEqualTo(user.getUsername())
        );
    }

    @Test
    @DisplayName("회원가입 한 유저인지 확인.")
    void checkUserHasJoin() {
        // given
        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);

        // stub 행동정의 (가설)
        when(userRepository.findByUsername("test1234")).thenReturn(user);

        // when
        Long userId = userService.checkUserHasJoin("test1234");
        Long userId2 = userService.checkUserHasJoin("test12342");

        // then
        assertAll(
                () -> assertThat(userId).isEqualTo(user.getId()),
                () -> assertThat(userId2).isNotEqualTo(user.getId())
        );
    }

    @Test
    @DisplayName("중복된 아이디가 있는지 확인.")
    void checkIdDuplicate() {
        // given
        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);

        // stub 행동정의 (가설)
        when(userRepository.findByUsername("test1234")).thenReturn(user);

        // when

        // then
        assertAll (
                () -> assertThatThrownBy(() -> userService.checkIdDuplicate("test1234")).hasMessage("중복된 아이디가 있습니다."),
                () -> assertThat(userService.checkIdDuplicate("test1222222")).isFalse()
        );
    }

    @Test
    @DisplayName("이메일로 아이디 찾기.")
    void findByUserId() {
        // given
        User user = new User("test1234", "testNick12", "test1234@gmail.com", "test1234", null);

        FindIdRequest findIdRequest = new FindIdRequest("test1234@gmail.com");
        FindIdRequest findIdRequest2 = new FindIdRequest("test12342@gmail.com");

        // stub 행동정의 (가설)
        when(userRepository.findByEmail(findIdRequest.getEmail())).thenReturn(user);

        // when
        FindIdResponse findIdResponse = userService.findByUserId(findIdRequest);

        // then
        assertAll (
                () -> assertThat(findIdResponse.getUsername()).isEqualTo(user.getUsername()),
                () -> assertThatThrownBy(() -> userService.findByUserId(findIdRequest2)).hasMessage("존재하지 않는 유저입니다.")
        );
    }

    @Test
    @DisplayName("중복된 이메일이 있는지 확인.")
    void checkEmailDuplicate() {
        // given
        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);

        // stub 행동정의 (가설)
        when(userRepository.findByEmail("test1234@gmail.com")).thenReturn(user);

        // when

        // then
        assertAll (
                () -> assertThatThrownBy(() -> userService.checkEmailDuplicate("test1234@gmail.com")).hasMessage("중복된 이메일이 있습니다."),
                () -> assertThat(userService.checkIdDuplicate("test1222222@gmail.com")).isFalse()
        );
    }

    @Test
    @DisplayName("유저 아이디랑 이메일을 활용하여 임시 비밀번호로 변경")
    void temporaryPassword() {
        // given
        User user = new User("test1234", "testNick12", "test1234@gmail.com", "test1234", null);

        FindPwRequest findPwRequest = new FindPwRequest("test1234", "test1234@gmail.com");

        // stub 행동정의 (가설)
        when(userRepository.findByUsernameAndEmail(findPwRequest.getUsername(), findPwRequest.getEmail())).thenReturn(user);

        // when
        FindPwResponse findPwResponse = userService.findByUserPw(findPwRequest);

        // then
        // user 비밀번호랑 바뀐 비밀번호랑 다르면 맞음.
        log.info("userPassword = {}", user.getPassword());
        log.info("updatePassword = {}", findPwResponse.getPassword());
        assertThat(findPwResponse.getPassword()).isNotEqualTo(user.getPassword());
    }
}
