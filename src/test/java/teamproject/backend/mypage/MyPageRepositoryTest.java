package teamproject.backend.mypage;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import teamproject.backend.domain.User;
import teamproject.backend.user.UserRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertAll;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class MyPageRepositoryTest {

    @Autowired
    MyPageRepository myPageRepository;
    @Autowired
    UserRepository userRepository;

    private static final User user = new User("userName123dd", "userNickName123","userEmail123@gmail.com","test123422", null);

    @Test
    @DisplayName("마이페이지 조회")
    void findById() {
        // given
        User saveUser = userRepository.save(user);

        // when
        Optional<User> findById = myPageRepository.findById(saveUser.getId());
        Optional<User> findById2 = myPageRepository.findById(2L);

        // then
        assertAll (
                () -> assertThat(findById.isPresent()),
                () -> assertThat(findById.get().getUsername()).isEqualTo(saveUser.getUsername()),
                () -> assertThat(findById.get().getEmail()).isEqualTo(saveUser.getEmail()),
                () -> assertThat(findById.get().getNickname()).isEqualTo(saveUser.getNickname()),

                () -> assertThat(findById2.isPresent()).isFalse()
        );
    }

    @Test
    @DisplayName("회원탈퇴")
    void userDelete() {
        // given
        User saveUser = userRepository.save(user);

        // when
        Optional<User> findById = myPageRepository.findById(saveUser.getId());
        myPageRepository.delete(findById.get());

        // then
//        assertAll (
//                () -> assertThat(findById.isPresent()).isFalse(),
//                () -> assertThat(saveUser).isNull()
//        );
    }
}
