package teamproject.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import teamproject.backend.domain.User;
import teamproject.backend.user.dto.JoinRequest;
import teamproject.backend.utils.SHA256;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;


    @Test
    public void join_Test() {
        // given
        JoinRequest dto = new JoinRequest();
        dto.setUsername("test1234");
        dto.setEmail("test1234@gmail.com");
        dto.setPassword("test1234");

        User user = new User(dto.getUsername(), dto.getEmail(), dto.getPassword());
        // stub 행동정의 (가설)
        when(userRepository.save(any())).thenReturn(user);

        // when
        userService.join(dto);

        // then
        assertThat(user.getUsername()).isEqualTo("test1234");
        assertThat(user.getEmail()).isEqualTo("test1234@gmail.com");
        assertThat(user.getPassword()).isEqualTo("test1234");
    }
}
