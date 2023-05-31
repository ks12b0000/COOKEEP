//package teamproject.backend.mypage;
//
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Spy;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.transaction.annotation.Transactional;
//import teamproject.backend.domain.User;
//import teamproject.backend.mypage.dto.CheckIdPwResponse;
//import teamproject.backend.mypage.dto.CheckPwRequest;
//import teamproject.backend.mypage.dto.GetUserResponse;
//import teamproject.backend.utils.SHA256;
//
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//import static org.junit.jupiter.api.Assertions.assertAll;
//import static org.mockito.Mockito.when;
//
//@Transactional
//@Slf4j
//@ExtendWith(MockitoExtension.class)
//public class MyPageServiceTest {
//    @InjectMocks
//    private MyPageServiceImpl myPageService;
//    @Mock
//    private MyPageRepository myPageRepository;
//    @Spy
//    SHA256 sha256;
//
//    @Test
//    @DisplayName("마이페이지 조회")
//    void userInfo() {
//        // given
//        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);
//
//        // stub
//        when(myPageRepository.findById(user.getId())).thenReturn(Optional.of(user));
//
//        // when
//        GetUserResponse user2 = myPageService.userInfo(user.getId());
//
//        // then
//        assertAll (
//                () -> assertThat(user2.getUserId()).isEqualTo(user.getId()),
//                () -> assertThat(user2.getUsername()).isEqualTo(user.getUsername()),
//                () -> assertThat(user2.getUser_image()).isEqualTo(user.getImageURL()),
//                () -> assertThat(user2.getNickname()).isEqualTo(user.getNickname()),
//                () -> assertThat(user2.getEmail()).isEqualTo(user.getEmail()),
//
//                () -> assertThatThrownBy(() -> myPageService.userInfo(0L)).hasMessage("존재하지 않는 유저입니다.")
//        );
//    }
//
//    @Test
//    @DisplayName("유저 비밀번호 확인")
//    void checkPassword() {
//        // given
//        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);
//
//        CheckPwRequest checkPwRequest = new CheckPwRequest(user.getPassword());
//        CheckPwRequest checkPwRequest2 = new CheckPwRequest("testddd222313");
//
//        // stub
//        when(myPageRepository.findById(user.getId())).thenReturn(Optional.of(user));
//        when(myPageRepository.findByPassword(SHA256.encrypt(checkPwRequest.getPassword(), user.getSalt()))).thenReturn(user);
//
//        // when
//        CheckIdPwResponse user2 = myPageService.checkPassword(checkPwRequest, user.getId());
//
//        // then
//        assertAll (
//                () -> assertThat(user2.getId()).isEqualTo(user.getId()),
//
//                () -> assertThatThrownBy(() -> myPageService.checkPassword(checkPwRequest2, 0L)).hasMessage("존재하지 않는 유저입니다."),
//                () -> assertThatThrownBy(() -> myPageService.checkPassword(checkPwRequest2, user.getId())).hasMessage("비밀번호를 확인해주세요.")
//        );
//    }
//}
