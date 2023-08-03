package teamproject.backend.mypage;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.User;
import teamproject.backend.mypage.dto.*;
import teamproject.backend.user.UserRepository;
import teamproject.backend.utils.SHA256;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Transactional
@Slf4j
@ExtendWith(MockitoExtension.class)
public class MyPageServiceTest {
    @InjectMocks
    private MyPageServiceImpl myPageService;
    @Mock
    private MyPageRepository myPageRepository;
    @Mock
    private UserRepository userRepository;
    @Spy
    SHA256 sha256;

    static User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);

    @Test
    @DisplayName("마이페이지 조회")
    void userInfo() {
        // given

        // stub
        when(myPageRepository.findById(user.getId())).thenReturn(Optional.of(user));

        // when
        GetUserResponse user2 = myPageService.userInfo(user.getId());

        // then
        assertAll (
                () -> assertThat(user2.getUserId()).isEqualTo(user.getId()),
                () -> assertThat(user2.getUsername()).isEqualTo(user.getUsername()),
                () -> assertThat(user2.getUser_image()).isEqualTo(user.getImageURL()),
                () -> assertThat(user2.getNickname()).isEqualTo(user.getNickname()),
                () -> assertThat(user2.getEmail()).isEqualTo(user.getEmail()),

                () -> assertThatThrownBy(() -> myPageService.userInfo(0L)).hasMessage("존재하지 않는 유저입니다.")
        );
    }

    @Test
    @DisplayName("유저 비밀번호 확인")
    void checkPassword() {
        // given
        CheckPwRequest checkPwRequest = new CheckPwRequest(user.getPassword());
        CheckPwRequest checkPwRequest2 = new CheckPwRequest("testddd222313");

        // stub
        when(myPageRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(myPageRepository.findByPassword(SHA256.encrypt(checkPwRequest.getPassword(), user.getSalt()))).thenReturn(user);

        // when
        CheckIdPwResponse user2 = myPageService.checkPassword(checkPwRequest, user.getId());

        // then
        assertAll (
                () -> assertThat(user2.getId()).isEqualTo(user.getId()),

                () -> assertThatThrownBy(() -> myPageService.checkPassword(checkPwRequest2, 0L)).hasMessage("존재하지 않는 유저입니다."),
                () -> assertThatThrownBy(() -> myPageService.checkPassword(checkPwRequest2, user.getId())).hasMessage("비밀번호를 확인해주세요.")
        );
    }

    @Test
    @DisplayName("유저 비밀번호 변경")
    void updateByUserPw() {
        // given
        UpdatePwRequest updatePwRequest = new UpdatePwRequest("update1234");
        MockHttpServletResponse response = new MockHttpServletResponse();
        // stub
        when(myPageRepository.findByIdForUpdate(user.getId())).thenReturn(Optional.of(user));

        // when
        String beforePassword = SHA256.encrypt(user.getPassword(), user.getSalt());
        String updatePassword = SHA256.encrypt(updatePwRequest.getUpdatePassword(), user.getSalt());
        myPageService.updateByUserPw(user.getId(), updatePwRequest, response);

        // then
        assertAll (
                () -> assertThat(user.getPassword()).isNotEqualTo(beforePassword),
                () -> assertThat(user.getPassword()).isEqualTo(updatePassword)
        );
    }

    @Test
    @DisplayName("유저 아이디 변경")
    void updateByUserName() {
        // given
        UpdateIdRequest updateIdRequest = new UpdateIdRequest("update1234");
        MockHttpServletResponse response = new MockHttpServletResponse();

        // stub
        when(myPageRepository.findByIdForUpdate(user.getId())).thenReturn(Optional.of(user));

        // when
        String beforeUserName = user.getUsername();
        String updateUserName = updateIdRequest.getUpdateUsername();
        myPageService.updateByUserId(user.getId(), updateIdRequest, response);

        // userName 중복 테스트를 위한 User 생성
        User user2 = new User("test123411", "test122ss", "test123ddf4@gmail.com", "test1234", null);
        UpdateIdRequest updateIdRequest2 = new UpdateIdRequest(user2.getUsername());
        when(myPageRepository.findByUsername(user2.getUsername())).thenReturn(user2);

        // then
        assertAll (
                () -> assertThat(user.getUsername()).isNotEqualTo(beforeUserName),
                () -> assertThat(user.getUsername()).isEqualTo(updateUserName),

                () -> assertThatThrownBy(() -> myPageService.updateByUserId(user.getId(), updateIdRequest2, response))
                        .hasMessage("중복된 아이디가 있습니다.")
        );
    }

    @Test
    @DisplayName("유저 이메일 변경")
    void updateByUserEmail() {
        // given
        UpdateEmailRequest updateEmailRequest = new UpdateEmailRequest("update1234@gmail.com");

        // stub
        when(myPageRepository.findByIdForUpdate(user.getId())).thenReturn(Optional.of(user));

        // when
        String beforeEmail = user.getEmail();
        String updateEmail = updateEmailRequest.getUpdateEmail();
        myPageService.updateByUserEmail(user.getId(), updateEmailRequest);

        // userEmail 중복 테스트를 위한 User 생성
        User user2 = new User("test123411", "test122ss", "test123ddf4@gmail.com", "test1234", null);
        UpdateEmailRequest updateEmailRequest2 = new UpdateEmailRequest(user2.getEmail());
        when(myPageRepository.findByEmail(user2.getEmail())).thenReturn(user2);

        // then
        assertAll (
                () -> assertThat(user.getEmail()).isNotEqualTo(beforeEmail),
                () -> assertThat(user.getEmail()).isEqualTo(updateEmail),

                () -> assertThatThrownBy(() -> myPageService.updateByUserEmail(user.getId(), updateEmailRequest2))
                        .hasMessage("중복된 이메일이 있습니다.")
        );
    }

}
