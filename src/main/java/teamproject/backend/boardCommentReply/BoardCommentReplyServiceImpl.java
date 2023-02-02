package teamproject.backend.boardCommentReply;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.boardComment.BoardCommentRepository;
import teamproject.backend.boardComment.BoardCommentService;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.BoardCommentReply;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.UserRepository;

import java.util.LinkedList;
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

    @Override
    @Transactional
    public Long save(BoardCommentReplyWriteRequest request) {
        BoardComment comment = boardCommentRepository.findById(request.getComment_id()).get();
        User user = getUserById(request.getUser_id());

        BoardCommentReply reply = new BoardCommentReply(user, comment, request.getText());

        boardCommentReplyRepository.save(reply);
        comment.increaseReplyCount();
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
        List<BoardCommentReply> replies = boardCommentReplyRepository.findByBoardComment(comment);
        for(BoardCommentReply reply : replies){
            delete(reply.getBoardCommentReplyId(), reply.getUser().getId());
        }
    }

    @Override
    public List<BoardCommentReplyResponse> findReplyByCommentId(Long commentId) {
        BoardComment boardComment = boardCommentRepository.findById(commentId).get();

        List<BoardCommentReply> replies = boardCommentReplyRepository.findByBoardComment(boardComment);
        System.out.println(replies.size());
        List<BoardCommentReplyResponse> list = new LinkedList<>();
        for(BoardCommentReply reply : replies){
            list.add(new BoardCommentReplyResponse(reply));
        }

        return list;
    }

    private User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(USER_NOT_EXIST);
        return user.get();
    }
}
