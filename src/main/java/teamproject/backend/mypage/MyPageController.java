package teamproject.backend.mypage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.mypage.dto.*;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ValidationSequence;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MyPageController {

    private final MyPageService myPageService;

    /**
     * 마이페이지 조회
     * [GET] /auth/user/mypage?user_id=
     * @param user_id
     * @return
     */
    @GetMapping("/auth/user/mypage")
    public BaseResponse<GetUserResponse> myPageUserInfo(@RequestParam Long user_id) {
        GetUserResponse user = myPageService.userInfo(user_id);

        return new BaseResponse("유저 정보를 성공적으로 가져왔습니다.", user);
    }

    /**
     * 유저 정보 수정 시 비밀번호 확인
     * [POST] /auth/user/check/password
     * @param checkPwRequest
     * @return
     */
    @PostMapping("/auth/user/check/password/{user_id}")
    public BaseResponse<CheckIdPwResponse> checkPassword(@Validated(ValidationSequence.class) @RequestBody CheckPwRequest checkPwRequest, @PathVariable Long user_id) {

        CheckIdPwResponse user = myPageService.checkPassword(checkPwRequest, user_id);

        return new BaseResponse("비밀번호 확인에 성공했습니다.", user);
    }

    /**
     * 유저 비밀번호 변경
     * [PUT] /auth/user/update/password/{user_id}
     * @param user_id
     * @param updatePwRequest
     * @param response
     * @return
     */
    @PutMapping("/auth/user/update/password/{user_id}")
    public BaseResponse updatePassword(@PathVariable Long user_id, @Validated(ValidationSequence.class) @RequestBody UpdatePwRequest updatePwRequest, HttpServletResponse response) {

        myPageService.updateByUserPw(user_id, updatePwRequest, response);

        return new BaseResponse("비밀번호 변경에 성공했습니다.");
    }

    /**
     * 유저 아이디 변경
     * [PUT] /user/update/username/{user_id}
     * @param user_id
     * @param updateIdRequest
     * @param response
     * @return
     */
    @PutMapping("/auth/user/update/username/{user_id}")
    public BaseResponse updateId(@PathVariable Long user_id, @Validated(ValidationSequence.class) @RequestBody UpdateIdRequest updateIdRequest, HttpServletResponse response) {

        myPageService.updateByUserId(user_id, updateIdRequest, response);

        return new BaseResponse("아이디 변경에 성공했습니다.");
    }

    /**
     * 유저 이메일 변경
     * [PUT] /auth/user/update/email/{user_id}
     * @param user_id
     * @param updateEmailRequest
     * @param response
     * @return
     */
    @PutMapping("/auth/user/update/email/{user_id}")
    public BaseResponse updateEmail(@PathVariable Long user_id, @Validated(ValidationSequence.class) @RequestBody UpdateEmailRequest updateEmailRequest, HttpServletResponse response) {

        myPageService.updateByUserEmail(user_id, updateEmailRequest, response);

        return new BaseResponse("이메일 변경에 성공했습니다.");
    }

    @PutMapping("/auth/user/update/nickname/{user_id}")
    public BaseResponse updateNickname(@PathVariable Long user_id, @Validated(ValidationSequence.class) @RequestBody UpdateNicknameRequest request) {

        myPageService.updateNickname(user_id, request);

        return new BaseResponse("닉네임 변경에 성공했습니다.");
    }

    @GetMapping("/auth/user/suggest/nickname")
    public BaseResponse updateNickname() {
        List<String> suggestNicknames = myPageService.suggestNickname(5);

        return new BaseResponse("닉네임 추천 목록을 불러왔습니다.", suggestNicknames);
    }

        /**
         * 회원 탈퇴
         * [DELETE] /auth/user/delete/{user_id}
         * @param user_id
         * @return
         */
    @DeleteMapping("/auth/user/delete/{user_id}")
    public BaseResponse userDelete(@PathVariable Long user_id, HttpServletResponse response) {

        myPageService.userDelete(user_id, response);

        return new BaseResponse("회원 탈퇴에 성공했습니다.");
    }

    /**
     * 유저가 좋아요 누른 글 목록
     * [GET] /auth/user/like/list/{user_id}
     * @param user_id
     * @return
     */
    @GetMapping("/auth/user/like/list/{user_id}")
    public BaseResponse likeByUser(@PathVariable Long user_id) {
        GetLikeByUserResponse getLikeByUserResponse = myPageService.likeByUser(user_id);

        return new BaseResponse("좋아요 누른 글 목록을 불러왔습니다.", getLikeByUserResponse);
    }

    /**
     * 유저가 쓴 글 목록
     * [GET] /auth/user/board/list/{user_id}
     * @param user_id
     * @return
     */
    @GetMapping("/auth/user/board/list/{user_id}")
    public BaseResponse boardByUser(@PathVariable Long user_id) {
        GetBoardByUserResponse getBoardByUserResponse = myPageService.boardByUser(user_id);

        return new BaseResponse("내가 쓴 글 목록을 불러왔습니다.", getBoardByUserResponse);
    }


    @DeleteMapping("/auth/user/like/list/{user_id}")
    public BaseResponse deleteBoardLikesByUser(@RequestBody DeleteBoardLikesRequest request, @PathVariable Long user_id) {
        myPageService.deleteBoardLikes(request, user_id);
        return new BaseResponse("선택한 유저의 좋아요를 삭제했습니다.");
    }

    /**
     * 알림 목록 가져오기
     * [GET] /auth/user/notification/list/{user_id}
     * @param user_id
     * @return
     */
    @GetMapping("/auth/user/notification/list/{user_id}")
    public BaseResponse notificationList(@PathVariable Long user_id, @SortDefault(sort = "createDate", direction = Sort.Direction.DESC) Sort sort) {
        GetNotificationResponse getNotificationResponse = myPageService.notificationByUser(user_id, sort);

        return new BaseResponse("알림 목록을 불러왔습니다.", getNotificationResponse);
    }
}
