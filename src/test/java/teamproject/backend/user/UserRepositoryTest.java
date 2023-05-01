package teamproject.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Named;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;

import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Named.*;

@Slf4j
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private static final User user = new User("userName1", "userNickName1","userEmail1@gmail.com","test123422", null);

    @Test
    @DisplayName("유저 회원가입")
    void join() {
        // given

        // when
        User savedUser = userRepository.save(user);

        // then
        assertAll(
                () -> assertThat(savedUser.getUsername()).isEqualTo("userName1"),
                () -> assertThat(savedUser.getNickname()).isEqualTo("userNickName1"),
                () -> assertThat(savedUser.getEmail()).isEqualTo("userEmail1@gmail.com"),
                () -> assertThat(savedUser.getPassword()).isEqualTo("test123422")
        );
    }

    @Test
    @DisplayName("회원가입된 유저를 아이디로 조회한다.")
    void findById() {
        // given
        User savedUser = userRepository.save(user);

        // when
        Optional<User> findUser = userRepository.findById(savedUser.getId());

        // then
        assertAll(
                () -> assertThat(findUser.isPresent()),
                () -> assertThat(findUser.get()).isEqualTo(savedUser)
        );
    }

    @Test
    @DisplayName("회원가입된 유저를 유저네임으로 조회한다.")
    void findByUserName() {
        // given
        User savedUser = userRepository.save(user);

        // when
        Optional<User> findUser = Optional.ofNullable(userRepository.findByUsername(savedUser.getUsername()));

        // then
        assertAll(
                () -> assertThat(findUser.isPresent()),
                () -> assertThat(findUser.get()).isEqualTo(savedUser)
        );
    }

    @ParameterizedTest(name = "{0}")
    @MethodSource("duplicate")
    @DisplayName("중복된 아이디, 이메일, 닉네임으로 회원가입을 할 수 없다.")
    void duplicateUserNameAndEmailAndNickName(User user2) {
        // given
        userRepository.save(user);

        // when
        // then
        assertThrows(RuntimeException.class, () -> userRepository.save(user2));
    }
    private static Stream<Arguments> duplicate() {
        return Stream.of(
                Arguments.of(named("아이디 중복", new User("userName1", "userNickName2","userEmail2@gmail.com","test123422", null))),
                Arguments.of(named("이메일 중복", new User("userName2", "userNickName2","userEmail1@gmail.com","test123422", null))),
                Arguments.of(named("닉네임 중복", new User("userName2", "userNickName1","userEmail2@gmail.com","test123422", null)))
        );
    }

    @Test
    @DisplayName("UserName과 PassWord가 일치하는 유저를 조회한다.")
    void findByUserNameAndPassWord() {
        // given
        userRepository.save(user);

        // when
        Optional<User> findUser = Optional.ofNullable(userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword()));

        // then
        assertAll(
                () -> assertThat(findUser.isPresent()),
                () -> assertThat(findUser.get()).isEqualTo(user)
        );
    }
}
