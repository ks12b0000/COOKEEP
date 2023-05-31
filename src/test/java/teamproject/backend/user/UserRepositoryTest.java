//package teamproject.backend.user;
//
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Named;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.params.ParameterizedTest;
//import org.junit.jupiter.params.provider.Arguments;
//import org.junit.jupiter.params.provider.MethodSource;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.dao.DataIntegrityViolationException;
//import teamproject.backend.domain.User;
//import teamproject.backend.response.BaseException;
//
//import java.util.Optional;
//import java.util.stream.Stream;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.junit.jupiter.api.Assertions.assertAll;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.junit.jupiter.api.Named.*;
//
//@Slf4j
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@DataJpaTest
//class UserRepositoryTest {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    private static final User user = new User("userName1", "userNickName1","userEmail1@gmail.com","test123422", null);
//
//    @Test
//    @DisplayName("유저 회원가입")
//    void join() {
//        // given
//
//        // when
//        User savedUser = userRepository.save(user);
//
//        // then
//        assertAll(
//                () -> assertThat(savedUser.getUsername()).isEqualTo("userName1"),
//                () -> assertThat(savedUser.getNickname()).isEqualTo("userNickName1"),
//                () -> assertThat(savedUser.getEmail()).isEqualTo("userEmail1@gmail.com"),
//                () -> assertThat(savedUser.getPassword()).isEqualTo("test123422")
//        );
//    }
//
//    @Test
//    @DisplayName("회원가입된 유저를 아이디로 조회한다.")
//    void findById() {
//        // given
//        User savedUser = userRepository.save(user);
//
//        // when
//        Optional<User> findUser = userRepository.findById(savedUser.getId());
//        Optional<User> findUser2 = userRepository.findById(2L);
//
//        // then
//        assertAll(
//                () -> assertThat(findUser.isPresent()),
//                () -> assertThat(findUser.get()).isEqualTo(savedUser),
//
//                () -> assertThat(findUser2.isPresent()).isFalse()
//        );
//    }
//
//    @Test
//    @DisplayName("회원가입된 유저를 유저네임으로 조회한다.")
//    void findByUserName() {
//        // given
//        User savedUser = userRepository.save(user);
//
//        // when
//        Optional<User> findUser = Optional.ofNullable(userRepository.findByUsername(savedUser.getUsername()));
//        Optional<User> findUser2 = Optional.ofNullable(userRepository.findByUsername("dddfe211"));
//
//        // then
//        assertAll(
//                () -> assertThat(findUser.isPresent()),
//                () -> assertThat(findUser.get()).isEqualTo(savedUser),
//
//                () -> assertThat(findUser2.isPresent()).isFalse()
//        );
//    }
//
//    @Test
//    @DisplayName("회원가입된 유저를 이메일로 조회한다.")
//    void findByEmail() {
//        // given
//        User savedUser = userRepository.save(user);
//
//        // when
//        Optional<User> findUser = Optional.ofNullable(userRepository.findByEmail(savedUser.getEmail()));
//        Optional<User> findUser2 = Optional.ofNullable(userRepository.findByEmail("ksadasd@gmail.com"));
//
//        // then
//        assertAll(
//                () -> assertThat(findUser.isPresent()),
//                () -> assertThat(findUser.get()).isEqualTo(savedUser),
//
//                () -> assertThat(findUser2.isPresent()).isFalse()
//        );
//    }
//
//    @Test
//    @DisplayName("회원가입된 유저를 유저네임과 이메일로 조회한다.")
//    void findByUserNameAndEmail() {
//        // given
//        User savedUser = userRepository.save(user);
//
//        // when
//        Optional<User> findUser = Optional.ofNullable(userRepository.findByUsernameAndEmail(savedUser.getUsername(), savedUser.getEmail()));
//        Optional<User> findUser2 = Optional.ofNullable(userRepository.findByUsernameAndEmail("username222","ksadasd@gmail.com"));
//
//        // then
//        assertAll(
//                () -> assertThat(findUser.isPresent()),
//                () -> assertThat(findUser.get()).isEqualTo(savedUser),
//
//                () -> assertThat(findUser2.isPresent()).isFalse()
//        );
//    }
//
//    @ParameterizedTest(name = "{0}")
//    @MethodSource("duplicate")
//    @DisplayName("중복된 아이디, 이메일, 닉네임으로 회원가입을 할 수 없다.")
//    void duplicateUserNameAndEmailAndNickName(User user2) {
//        // given
//        userRepository.save(user);
//
//        // when
//        // then
//        assertThrows(RuntimeException.class, () -> userRepository.save(user2));
//    }
//    private static Stream<Arguments> duplicate() {
//        return Stream.of(
//                Arguments.of(named("아이디 중복", new User("userName1", "userNickName2","userEmail2@gmail.com","test123422", null))),
//                Arguments.of(named("이메일 중복", new User("userName2", "userNickName2","userEmail1@gmail.com","test123422", null))),
//                Arguments.of(named("닉네임 중복", new User("userName2", "userNickName1","userEmail2@gmail.com","test123422", null)))
//        );
//    }
//
//    @Test
//    @DisplayName("UserName과 PassWord가 일치하는 유저를 조회한다.")
//    void findByUserNameAndPassWord() {
//        // given
//        userRepository.save(user);
//
//        // when
//        Optional<User> findUser = Optional.ofNullable(userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword()));
//
//        // then
//        assertAll(
//                () -> assertThat(findUser.isPresent()),
//                () -> assertThat(findUser.get()).isEqualTo(user)
//        );
//    }
//
//    @Test
//    @DisplayName("UserNickName이 사용 중인지 확인.")
//    void existsUserByNickname() {
//        // given
//        userRepository.save(user);
//
//        // when
//        boolean findUser = userRepository.existsUserByNickname("userNickName1");
//        boolean findUser2 = userRepository.existsUserByNickname("userNickName12");
//
//        // then
//        assertThat(findUser);
//        assertThat(!findUser2);
//    }
//
//
//    @ParameterizedTest(name = "{0}")
//    @MethodSource("validation")
//    @DisplayName("아이디, 닉네임, 이메일, 비밀번호가 null 이거나 지정 된 길이보다 넘어갈 시 에러가 발생한다.")
//    void validationCheck(User user2) {
//        // given
//
//        // when
//        // then
//        assertThrows(RuntimeException.class, () -> userRepository.save(user2));
//    }
//    private static Stream<Arguments> validation() {
//        return Stream.of(
//                Arguments.of(named("아이디가 null일 때 에러 발생", new User(null, "userNickName2","userEmail2@gmail.com","test123422", null))),
//                Arguments.of(named("아이디가 50자 이상 넘어갈 때 에러발생", new User("asdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdf", "userNickName2","userEmail2@gmail.com","test123422", null))),
//
//                Arguments.of(named("닉네임이 null일 때 에러 발생", new User("userName2", null,"userEmail1@gmail.com","test123422", null))),
//                Arguments.of(named("닉네임이 50자 이상 넘어갈 때 에러발생", new User("userName22", "userNickName3userNickName3userNickName3userNickName3userNickName3userNickName3userNickName3","userEmail2@gmail.com","test123422", null))),
//
//                Arguments.of(named("이메일이 null일 때 에러 발생", new User("userName243", "userNickName234",null,"test123422", null))),
//
//                Arguments.of(named("비밀번호가 null일 때 에러 발생", new User("userName2112", "userNickName23412","userEmail1",null, null)))
//        );
//    }
//}
