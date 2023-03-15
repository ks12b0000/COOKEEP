package teamproject.backend.boardComment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.BoardRepository;
import teamproject.backend.boardComment.dto.BoardCommentListResponse;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.BoardCommentReplyService;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardComment;
import teamproject.backend.domain.Notification;
import teamproject.backend.domain.User;
import teamproject.backend.notification.NotificationRepository;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.user.UserRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static teamproject.backend.response.BaseExceptionStatus.NOT_EXIST_BOARD;
import static teamproject.backend.response.BaseExceptionStatus.USER_NOT_EXIST;

@Service
@RequiredArgsConstructor
public class BoardCommentServiceImpl implements BoardCommentService{

    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    private final BoardCommentRepository boardCommentRepository;

    private final BoardCommentReplyService boardCommentReplyService;

    private final NotificationRepository notificationRepository;

    @Override
    @Transactional
    public Long save(BoardCommentWriteRequest writeRequest) {
        Board board = getBoardBy(writeRequest.getBoard_id());
        User user = getUserById(writeRequest.getUser_id());

        BoardComment comment = new BoardComment(user, board, writeRequest.getText());
        boardCommentRepository.save(comment);
        board.increaseCommentCount();
        if (board.getUser().getId() != user.getId()) {
            notificationSave(user, board);
        }

        return comment.getBoardCommentId();
    }

    @Override
    public BoardComment getCommentBy(Long commentId) {
        Optional<BoardComment> comment = boardCommentRepository.findById(commentId);
        if(comment.isEmpty()) throw new BaseException(BaseExceptionStatus.NOT_EXIST_COMMENT);
        return comment.get();
    }


    @Override
    @Transactional
    public void update(BoardCommentUpdateRequest updateRequest) {
        BoardComment comment = getCommentBy(updateRequest.getBoardComment_id());

        validateUser(comment, updateRequest.getUser_id());

        comment.setText(updateRequest.getText());
    }

    private void validateUser(BoardComment comment, Long requestUserId) {
        User createUser = comment.getUser();
        User updateUser = getUserById(requestUserId);
        if(createUser != updateUser) throw new BaseException(BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS);
    }

    @Override
    @Transactional
    public void delete(Long commentId, Long userId) {
        BoardComment comment = getCommentBy(commentId);
        Board board = comment.getBoard();

        validateUser(comment, userId);

        boardCommentReplyService.deleteAllReplyOf(comment);

        boardCommentRepository.delete(comment);
        board.decreaseCommentCount();
    }

    @Override
    public BoardCommentListResponse findCommentListByBoard(Pageable pageable, Long boardId) {
        Board board = getBoardBy(boardId);
        Page<BoardCommentResponse> comments = boardCommentRepository.findByBoardOrderByCreateDateDesc(pageable, board);
        return new BoardCommentListResponse(comments.getContent(), comments.getTotalPages());
    }

    @Override
    public List<BoardCommentResponse> findCommentListByUser(Long userId) {
        User user = getUserById(userId);

        List<BoardComment> comments = boardCommentRepository.findByUser(user);
        List<BoardCommentResponse> list = getBoardCommentResponses(comments);
        return list;
    }

    private List<BoardCommentResponse> getBoardCommentResponses(List<BoardComment> comments){
        List<BoardCommentResponse> list = new LinkedList<>();
        for (BoardComment comment : comments){
            list.add(new BoardCommentResponse(comment));
        }
        return list;
    }

    private User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(USER_NOT_EXIST);
        return user.get();
    }

    private Board getBoardBy(Long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);
        return board.get();
    }

    /*private void deleteAllReplyOf(BoardComment comment) {
        List<BoardCommentReply> replies = boardCommentReplyRepository.findByBoardComment(comment);
        for(BoardCommentReply reply : replies){
            boardCommentReplyRepository.delete(reply);
        }
    }*/

    private void notificationSave(User user, Board board) {
        String message = "내가 작성한 글 " + "[" + board.getTitle() + "] 에 " + user.getUsername() + "님이 댓글을 달았습니다.";
        String url = "https://www.teamprojectvv.shop/category/" + board.getBoardId();
        if (board.getUser().getId() != user.getId()) {
            Notification notification = new Notification(board.getUser(), message, url, board);
            notificationRepository.save(notification);
        }
    }
}


