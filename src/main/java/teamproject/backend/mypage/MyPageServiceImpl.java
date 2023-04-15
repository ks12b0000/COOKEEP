package teamproject.backend.mypage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.BoardRepository;
import teamproject.backend.board.BoardService;
import teamproject.backend.boardComment.BoardCommentRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.Notification;
import teamproject.backend.domain.User;
import teamproject.backend.like.LikeBoardRepository;
import teamproject.backend.mypage.dto.*;
import teamproject.backend.notification.NotificationRepository;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.RandomNickName;
import teamproject.backend.utils.S3.S3DAO;
import teamproject.backend.utils.SHA256;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MyPageServiceImpl implements MyPageService {

    private final MyPageRepository myPageRepository;
    private final LikeBoardRepository likeBoardRepository;
    private final BoardRepository boardRepository;

    private final BoardService boardService;

    private final NotificationRepository notificationRepository;
    private final BoardCommentRepository boardCommentRepository;

    private final S3DAO s3DAO;


    /**
     * 마이페이지 조회
     * @param user_id
     * @return
     */
    @Override
    public GetUserResponse userInfo(Long user_id) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));
        return new GetUserResponse(user);
    }

    /**
     * 유저 정보 수정 시 비밀번호 확인
     * @param checkPwRequest
     * @return
     */
    @Override
    public CheckIdPwResponse checkPassword(CheckPwRequest checkPwRequest, Long user_id) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        user = myPageRepository.findByPassword(SHA256.encrypt(checkPwRequest.getPassword(), user.getSalt()));

        if(user == null){
            throw new BaseException(USER_NOT_PASSWORD);
        } else {
            return new CheckIdPwResponse(user.getId());
        }
    }

    /**
     * 유저 비밀번호 변경
     * @param user_id
     * @param updatePwRequest
     * @param response
     */
    @Override
    @Transactional
    public void updateByUserPw(Long user_id, UpdatePwRequest updatePwRequest, HttpServletResponse response) {

        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        String updatePassword = SHA256.encrypt(updatePwRequest.getUpdatePassword(), user.getSalt());
        user.updatePassword(updatePassword);

        logout(response);
    }

    /**
     * 유저 아이디 변경
     * @param user_id
     * @param updateIdRequest
     * @param response
     */
    @Override
    @Transactional
    public void updateByUserId(Long user_id, UpdateIdRequest updateIdRequest, HttpServletResponse response) {

        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        String updateUsername = updateIdRequest.getUpdateUsername();

        User userIdCheck = myPageRepository.findByUsername(updateUsername);

        if(userIdCheck == null){    // 중복 X
            user.updateUsername(updateUsername);
            logout(response);
        } else {
            throw new BaseException(DUPLICATE_ID); // 중복 O(중복된 아이디가 있습니다.)
        }
    }

    /**
     * 유저 이메일 변경
     * @param user_id
     * @param updateEmailRequest
     * @param response
     */
    @Override
    @Transactional
    public void updateByUserEmail(Long user_id, UpdateEmailRequest updateEmailRequest, HttpServletResponse response) {

        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        String updateEmail = updateEmailRequest.getUpdateEmail();

        User updateEmailCheck = myPageRepository.findByEmail(updateEmail);

        if(updateEmailCheck == null){    // 중복 X
            user.updateEmail(updateEmail);
            logout(response);
        } else {
            throw new BaseException(DUPLICATE_EMAIL); // 중복 O(중복된 이메일이 있습니다.)
        }
    }

    /**
     * 유저 정보 수정 후 로그아웃
     * @param response
     */
    public void logout(HttpServletResponse response) {
        // accessToken 삭제
        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        // refreshToken 삭제
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);
    }

    /**
     * 회원 탈퇴
     * @param user_id
     */
    @Override
    @Transactional
    public void userDelete(Long user_id, HttpServletResponse response) {

        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        myPageRepository.delete(user);
        s3DAO.delete(""+user_id);
        logout(response);
    }

    /**
     * 유저가 좋아요 누른 글 목록
     * @param user_id
     * @return
     */
    @Override
    public GetLikeAndCommentByUserResponse likeByUser(Pageable pageable, Long user_id) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));
        Page<LikeAndCommentByUserResponse> boards = likeBoardRepository.findBoardByUserId(pageable, user.getId());
        GetLikeAndCommentByUserResponse getCommentByUserResponse = GetLikeAndCommentByUserResponse.builder()
                .commentList(boards.getContent())
                .total(boards.getTotalPages())
                .build();
        return getCommentByUserResponse;
    }

    /**
     * 유저가 쓴 글 목록
     * @param user_id
     * @return
     */
    @Override
    public GetBoardByUserResponse boardByUser(Pageable pageable, Long user_id) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));
        Page<BoardByUserResponse> boards = boardRepository.findBoardByUserId(pageable, user.getId());
        GetBoardByUserResponse getBoardByUserResponse = GetBoardByUserResponse.builder()
                .boardList(boards.getContent())
                .total(boards.getTotalPages())
                .build();
        return getBoardByUserResponse;
    }


    @Override
    public void deleteBoardLikes(DeleteBoardLikesRequest request, Long userId){
        User user = myPageRepository.findById(userId).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        for(Long boardId : request.getBoardIdList()){
            Optional<Board> board = boardRepository.findById(boardId);
            if(board.isPresent()){
                if(likeBoardRepository.existsByBoardAndUser(board.get(), user)){
                    boardService.updateLikeOfBoard(boardId, user);
                }
            }
        }
    }

    /**
     * 알림 목록 가져오기
     * @param user_id
     * @return
     */
    @Override
    public GetNotificationResponse notificationByUser(Long user_id, Pageable pageable) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));
        Page<Notification> notifications = notificationRepository.findPageByUser(user, pageable);

        GetNotificationResponse getNotificationResponse = GetNotificationResponse.builder()
                .notificationList(notifications.getContent().stream().map(Notification::toDto).collect(Collectors.toList()))
                .total(notifications.getTotalPages())
                .build();

        return getNotificationResponse;
    }

    @Override
    @Transactional
    public void updateNickname(Long user_id, UpdateNicknameRequest request){
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));
        String newNickname = request.getNickname();

        if(myPageRepository.existsUserByNickname(newNickname)){
            new BaseException(DUPLICATE_NICKNAME);
        }

        user.updateNickname(newNickname);
    }

    @Override
    public List<String> suggestNickname(int size){
        List<String> nicknames = new ArrayList<>();

        for(int i = 0; i < 100; i++){
            String random = RandomNickName.get(15);
            if(nicknames.size() >= size) break;
            if (!myPageRepository.existsUserByNickname(random)){
                nicknames.add(random);
            }
        }

        return nicknames;
    }

    /**
     * 내가 댓글 단 글 목록 가져오기
     * @param user_id
     * @return
     */
    @Override
    public GetLikeAndCommentByUserResponse commentByUser(Pageable pageable, Long user_id) {
        User user = myPageRepository.findById(user_id).orElseThrow(() -> new BaseException(USER_NOT_EXIST));

        Page<LikeAndCommentByUserResponse> commentByUserResponses = boardCommentRepository.findByUserDistinctBoard(pageable, user);

        GetLikeAndCommentByUserResponse getCommentByUserResponse = GetLikeAndCommentByUserResponse.builder()
                .commentList(commentByUserResponses.getContent())
                .total(commentByUserResponses.getTotalPages())
                .build();

        return getCommentByUserResponse;
    }
}
