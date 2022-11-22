package teamproject.backend.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import teamproject.backend.user.UserRepository;

import static org.assertj.core.api.Assertions.*;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void join_Test() {
        // given
        String username = "test1234";
        String email = "test1234@gmail.com";
        String password = "test1234";
        User user = new User(username, email, password);

        // when
        User userPS = userRepository.save(user);

        // then
        assertThat(username).isEqualTo(userPS.getUsername());
        assertThat(email).isEqualTo(userPS.getEmail());
        assertThat(password).isEqualTo(userPS.getPassword());
    }
}
