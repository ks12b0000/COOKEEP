//package teamproject.backend.mypage;
//
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.data.domain.Pageable;
//import teamproject.backend.domain.User;
//import teamproject.backend.like.LikeBoardRepository;
//import teamproject.backend.user.UserRepository;
//import teamproject.backend.utils.SHA256;
//
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//@Slf4j
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@DataJpaTest
//public class MyPageRepositoryTest {
//
//    @Autowired
//    MyPageRepository myPageRepository;
//    @Autowired
//    UserRepository userRepository;
//
//    private static final User user = new User("userName123dd", "userNickName123","userEmail123@gmail.com","test123422", null);
//
//    @Test
//    @DisplayName("마이페이지 조회")
//    void findById() {
//        // given
//        User saveUser = userRepository.save(user);
//
//        // when
//        Optional<User> findById = myPageRepository.findById(saveUser.getId());
//        Optional<User> findById2 = myPageRepository.findById(2L);
//
//        // then
//        assertAll (
//                () -> assertThat(findById.isPresent()),
//                () -> assertThat(findById.get().getUsername()).isEqualTo(saveUser.getUsername()),
//                () -> assertThat(findById.get().getEmail()).isEqualTo(saveUser.getEmail()),
//                () -> assertThat(findById.get().getNickname()).isEqualTo(saveUser.getNickname()),
//
//                () -> assertThat(findById2.isPresent()).isFalse()
//        );
//    }
//
//    @Test
//    @DisplayName("비밀번호가 일치한 회원 찾기")
//    void checkPassword() {
//        // given
//        User saveUser = userRepository.save(user);
//
//        // when
//        Optional<User> user2 = myPageRepository.findById(saveUser.getId());
//        User findUser = myPageRepository.findByPassword(user2.get().getPassword());
//
//        // then
//        assertThat(saveUser.getId()).isEqualTo(findUser.getId());
//    }
//}
