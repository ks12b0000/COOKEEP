package teamproject.backend.boardCommentReply;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.boardComment.BoardCommentRepository;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyListResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.*;
import teamproject.backend.notification.NotificationRepository;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.UserRepository;

import java.util.List;
import java.util.Optional;

import static teamproject.backend.response.BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS;
import static teamproject.backend.response.BaseExceptionStatus.USER_NOT_EXIST;

@Service
@RequiredArgsConstructor
public class BoardCommentReplyServiceImpl implements BoardCommentReplyService{
    private final BoardCommentRepository boardCommentRepository;
    private final BoardCommentReplyRepository boardCommentReplyRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional
    public Long save(BoardCommentReplyWriteRequest request) {
        BoardComment comment = boardCommentRepository.findById(request.getComment_id()).get();
        User user = getUserById(request.getUser_id());

        BoardCommentReply reply = new BoardCommentReply(user, comment, request.getText());

        boardCommentReplyRepository.save(reply);
        comment.increaseReplyCount();
        if (comment.getBoard().getUser().getId() != user.getId()) {
            notificationSave(user, comment.getBoard());
        }
        return reply.getBoardCommentReplyId();
    }

    @Override
    @Transactional
    public void update(BoardCommentReplyUpdateRequest request) {
        BoardCommentReply reply = boardCommentReplyRepository.findById(request.getReply_id()).get();
        User requestUser = getUserById(request.getUser_id());
        User createUser = reply.getUser();

        if(createUser != requestUser) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        reply.setText(request.getText());
    }

    @Override
    @Transactional
    public void delete(Long replyId, Long userId) {
        BoardCommentReply reply = boardCommentReplyRepository.findById(replyId).get();
        User deleteUser = getUserById(userId);
        User createUser = reply.getUser();

        if(createUser != deleteUser) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        reply.getBoardComment().decreaseReplyCount();

        boardCommentReplyRepository.delete(reply);
    }

    @Override
    @Transactional
    public void deleteAllReplyOf(BoardComment comment) {
        List<BoardCommentReply> replies = boardCommentReplyRepository.findAllByBoardComment(comment);
        for(BoardCommentReply reply : replies){
            delete(reply.getBoardCommentReplyId(), reply.getUser().getId());
        }
    }

    @Override
    public BoardCommentReplyListResponse findReplyByCommentId(Pageable pageable, Long commentId) {
        BoardComment boardComment = boardCommentRepository.findById(commentId).get();
        Page<BoardCommentReplyResponse> replies = boardCommentReplyRepository.findByBoardComment(pageable, boardComment);
        return new BoardCommentReplyListResponse(replies.getContent(), replies.getTotalPages());
    }

    private User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(USER_NOT_EXIST);
        return user.get();
    }

    private void notificationSave(User user, Board board) {
        String message = "내가 작성한 글 " + "[" + board.getTitle() + "] 에 " + user.getNickname() + "님이 대댓글을 달았습니다.";
        String url = "https://www.teamprojectvv.shop/category/" + board.getBoardId();
        Notification notification = new Notification(board.getUser(), message, url, board);
        notificationRepository.save(notification);
    }
}
