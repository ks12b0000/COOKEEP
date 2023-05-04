package teamproject.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.user.dto.SocialUserInfo;

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
        User user = new User("test1234", "test1234@gmail.com", "test1234");

        // stub 행동정의 (가설)
        when(userRepository.save(any())).thenReturn(user);

        // when
        SocialUserInfo findUser = userService.joinBySocial(user.getUsername(), user.getEmail());

        // then
        assertAll(
                () -> assertThat(findUser.getId()).isEqualTo(user.getId()),
                () -> assertThat(findUser.getUsername()).isEqualTo(user.getUsername())
        );
    }

}
