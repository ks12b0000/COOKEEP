package teamproject.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import teamproject.backend.domain.User;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@Slf4j
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void join_Test() {
        // given
        User user = new User("test1234", "test1234@gmail.com", "test1234");

        // when
        User userPS = userRepository.save(user);

        // then
        assertThat(user.getUsername()).isEqualTo(userPS.getUsername());
        assertThat(user.getEmail()).isEqualTo(userPS.getEmail());
        assertThat(user.getPassword()).isEqualTo(userPS.getPassword());
    }

    @Test
    public void join_중복Test() {
        // given
        User user = new User("test1234", "test1234@gmail.com", "test1234");

        userRepository.save(user);

        // when
        User user2 = new User("test1234", "test1234@gmail.com", "test1234");

        // then
        assertThrows(RuntimeException.class, () -> userRepository.save(user2));
    }

    @Test
    public void login_Test() {
        // given
        User user = new User("test1234", "test1234@gmail.com", "test1234");
        userRepository.save(user);

        // when
        User userLogin = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());

        // then
        assertThat(user.getUsername()).isEqualTo(userLogin.getUsername());
        assertThat(user.getPassword()).isEqualTo(userLogin.getPassword());
    }
}
