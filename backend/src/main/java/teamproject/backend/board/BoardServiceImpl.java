package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.boardComment.BoardCommentRepository;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardComment.dto.BoardCommentUpdateRequest;
import teamproject.backend.boardComment.dto.BoardCommentWriteRequest;
import teamproject.backend.boardCommentReply.BoardCommentReplyRepository;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyResponse;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyUpdateRequest;
import teamproject.backend.boardCommentReply.dto.BoardCommentReplyWriteRequest;
import teamproject.backend.boardTag.BoardTagService;
import teamproject.backend.domain.*;
import teamproject.backend.foodCategory.FoodCategoryService;
import teamproject.backend.imageFile.ImageFileRepository;
import teamproject.backend.like.LikeBoardRepository;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.UserRepository;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final FoodCategoryService foodCategoryService;
    private final LikeBoardRepository likeBoardRepository;
    private final ImageFileRepository imageFileRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final BoardCommentReplyRepository boardCommentReplyRepository;
    private final BoardTagService boardTagService;
    private static final String DEFAULT_IMAGE_URL = "https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png";
    @Override
    @Transactional
    public Long save(BoardWriteRequest boardWriteRequest){
        Board board = createBoard(boardWriteRequest);
        boardRepository.save(board);
        boardTagService.saveBoardTags(board, boardWriteRequest.getTags());
        return board.getBoardId();
    }

    private Board createBoard(BoardWriteRequest boardWriteRequest) {
        User user = getUserById(boardWriteRequest.getUser_id());
        FoodCategory foodCategory = foodCategoryService.getFoodCategory(boardWriteRequest.getCategory());

        if(boardWriteRequest.getThumbnail() == null) boardWriteRequest.setThumbnail(DEFAULT_IMAGE_URL);
        if(!thumbnailExist(boardWriteRequest.getThumbnail())) throw new BaseException(NOT_EXIST_IMAGE_URL);

        Board board = new Board(foodCategory, boardWriteRequest, user);
        return board;
    }

    private User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(USER_NOT_EXIST);
        return user.get();
    }

    @Override
    public BoardReadResponse findBoardReadResponseByBoardId(Long boardId){
        Board board = findBoardByBoardId(boardId);
        String tags = boardTagService.findTagsByBoard(board);
        return new BoardReadResponse(board, tags);
    }

    @Override
    public Board findBoardByBoardId(Long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);
        return board.get();
    }

    @Override
    public List<BoardReadResponse> findBoardReadResponseListByUserId(Long userId) {
        List<Board> boards = boardRepository.findByUser_id(userId);

        List<BoardReadResponse> responses = getBoardReadResponses(boards, boards.size());

        return responses;
    }

    private List<BoardReadResponse> getBoardReadResponses(List<Board> boards, int length) {
        List<BoardReadResponse> responses = new ArrayList<>();
        for(int i = 0; i < length; i++){
            Board board = boards.get(i);
            String tags = boardTagService.findTagsByBoard(board);
            responses.add(new BoardReadResponse(board, tags));
        }
        return responses;
    }

    @Override
    public List<BoardReadResponse> findBoardReadResponseListByFoodCategoryName(String categoryName) {
        FoodCategory foodCategory = foodCategoryService.getFoodCategory(categoryName);
        List<Board> boards = boardRepository.findByCategory(foodCategory);

        List<BoardReadResponse> responses = getBoardReadResponses(boards, boards.size());

        return responses;
    }

    @Override
    public List<BoardReadResponse> findBoardReadResponseOrderByCommentedDesc(int numberOfBoard) {
        List<Board> boards = boardRepository.findAllOrderByCommentedDesc();
        return getBoardReadResponses(boards, 10);
    }

    @Override
    public List<BoardReadResponse> findBoardReadResponseOrderByLikedDesc(int numberOdBoard) {
        List<Board> boards = boardRepository.findAllOrderByLikedDesc();
        return getBoardReadResponses(boards, 10);
    }

    @Override
    @Transactional
    public void update(Long boardId, BoardWriteRequest boardWriteRequest){
        Board board = findBoardByBoardId(boardId);
        User UpdateUser = getUserById(boardWriteRequest.getUser_id());
        FoodCategory foodCategory = foodCategoryService.getFoodCategory(boardWriteRequest.getCategory());

        if(UpdateUser != board.getUser()) throw new BaseException(UNAUTHORIZED_USER_ACCESS);
        if(boardWriteRequest.getThumbnail() == null) boardWriteRequest.setThumbnail(DEFAULT_IMAGE_URL);
        if(!thumbnailExist(boardWriteRequest.getThumbnail())) throw new BaseException(NOT_EXIST_IMAGE_URL);

        board.update(boardWriteRequest, foodCategory);
    }

    @Override
    @Transactional
    public Long saveComment(BoardCommentWriteRequest boardCommentWriteRequest) {
        Board board = findBoardByBoardId(boardCommentWriteRequest.getBoard_id());
        User user = getUserById(boardCommentWriteRequest.getUser_id());

        BoardComment comment = new BoardComment(user, board, boardCommentWriteRequest.getText());
        boardCommentRepository.save(comment);
        board.increaseCommentCount();

        return comment.getBoardCommentId();
    }

    @Override
    @Transactional
    public void updateComment(BoardCommentUpdateRequest request) {
        BoardComment comment = getBoardComment(request.getBoardComment_id());

        getUserById(request.getUser_id());

        comment.setText(request.getText());
    }

    private BoardComment getBoardComment(Long request) {
        Optional<BoardComment> comment = boardCommentRepository.findById(request);
        if(comment.isEmpty()) throw new BaseException(NOT_EXIST_COMMENT);
        return comment.get();
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, Long deleteUser) {
        BoardComment comment = getBoardComment(commentId);
        Board board = comment.getBoard();

        User commentCreateUser = comment.getUser();
        User commentDeleteUser = getUserById(deleteUser);
        if(commentCreateUser != commentDeleteUser) throw new BaseException(USER_NOT_EXIST);

        deleteAllReplyOf(comment);

        boardCommentRepository.delete(comment);
        board.decreaseCommentCount();
    }

    private void deleteAllReplyOf(BoardComment comment) {
        List<BoardCommentReply> replies = boardCommentReplyRepository.findByBoardComment(comment);
        for(BoardCommentReply reply : replies){
            boardCommentReplyRepository.delete(reply);
        }
    }

    @Override
    public List<BoardCommentResponse> findCommentByBoardId(Long boardId) {
        Board board = findBoardByBoardId(boardId);

        List<BoardComment> comments = boardCommentRepository.findByBoard(board);

        List<BoardCommentResponse> list = getBoardCommentResponses(comments);
        return list;
    }

    private List<BoardCommentResponse> getBoardCommentResponses(List<BoardComment> comments) {
        List<BoardCommentResponse> list = new LinkedList<>();
        for (BoardComment comment : comments){
            list.add(new BoardCommentResponse(comment));
        }
        return list;
    }

    @Override
    public List<BoardCommentResponse> findCommentByUserId(Long userId) {
        User user = getUserById(userId);

        List<BoardComment> comments = boardCommentRepository.findByUser(user);

        List<BoardCommentResponse> list = getBoardCommentResponses(comments);
        return list;
    }

    @Override
    @Transactional
    public Long saveReply(BoardCommentReplyWriteRequest request) {
        BoardComment comment = getBoardComment(request.getComment_id());
        User user = getUserById(request.getUser_id());

        BoardCommentReply reply = new BoardCommentReply(user, comment, request.getText());

        boardCommentReplyRepository.save(reply);
        comment.increaseReplyCount();

        return reply.getBoardCommentReplyId();
    }

    @Override
    @Transactional
    public void updateReply(BoardCommentReplyUpdateRequest request) {
        BoardCommentReply reply = getBoardCommentReply(request.getReply_id());
        User requestUser = getUserById(request.getUser_id());
        User createUser = reply.getUser();

        if(createUser != requestUser) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        reply.setText(request.getText());
    }

    private BoardCommentReply getBoardCommentReply(Long replyId) {
        Optional<BoardCommentReply> reply = boardCommentReplyRepository.findById(replyId);
        if(reply.isEmpty()) throw new BaseException(NOT_EXIST_REPLY);
        return reply.get();
    }

    @Override
    @Transactional
    public void deleteReply(Long replyId, Long userId) {
        BoardCommentReply reply = getBoardCommentReply(replyId);
        User deleteUser = getUserById(userId);
        User createUser = reply.getUser();

        if(createUser != deleteUser) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        reply.getBoardComment().decreaseReplyCount();

        boardCommentReplyRepository.delete(reply);
    }

    @Override
    public List<BoardCommentReplyResponse> findReplyByCommentId(Long commentId) {
        BoardComment boardComment = getBoardComment(commentId);

        List<BoardCommentReply> replies = boardCommentReplyRepository.findByBoardComment(boardComment);
        System.out.println(replies.size());
        List<BoardCommentReplyResponse> list = new LinkedList<>();
        for(BoardCommentReply reply : replies){
            list.add(new BoardCommentReplyResponse(reply));
        }

        return list;
    }

    @Override
    @Transactional
    public void delete(Long userId, Long boardId) {
        Board board = findBoardByBoardId(boardId);
        User requestUser = getUserById(userId);
        if(board.getUser() != requestUser) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        deleteImageAll(board);
        deleteBoardLikes(board);
        deleteBoardComments(board);

        boardRepository.delete(board);
    }

    private void deleteBoardComments(Board board) {
        List<BoardComment> commentList = boardCommentRepository.findByBoard(board);
        for(BoardComment comment : commentList){
            boardCommentRepository.delete(comment);
        }
    }

    private void deleteBoardLikes(Board board) {
        List<BoardLike> likeList = likeBoardRepository.findByBoard(board);
        for(BoardLike like : likeList){
            likeBoardRepository.delete(like);
        }
    }

    @Transactional
    private void deleteImageAll(Board board){
        //글삭제 알고리즘
    }

    /*private List<String> getImageUrlInText(String text){
        List<String> urls = new LinkedList<>();

        return null;
    }*/


    @Override
    @Transactional
    public String updateLikeOfBoard(Long boardId, User user) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BaseException(NOT_EXIST_BOARD));
        if (!hasLikeBoard(board, user)) {
            board.increaseLikeCount();
            return createLikeBoard(board, user);
        }
        board.decreaseLikeCount();
        return removeLikeBoard(board, user);
    }

    private boolean thumbnailExist(String thumbnail){
        if(thumbnail.startsWith("https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/")) return true;
        if(imageFileRepository.findByUrl(thumbnail) != null) return true;

        return false;
    }

    public boolean hasLikeBoard(Board board, User user) {
        return likeBoardRepository.findByBoardAndUser(board, user).isPresent();
    }

    public String createLikeBoard(Board board, User user) {
        BoardLike boardLike = new BoardLike(board, user); // true 처리
        likeBoardRepository.save(boardLike);
        return "좋아요 누르기 성공.";
    }

    public String removeLikeBoard(Board board, User user) {
        BoardLike boardLike = likeBoardRepository.findByBoardAndUser(board, user).orElseThrow(() -> {
            throw new BaseException(NOT_LIKE_BOARD);
        });
        likeBoardRepository.delete(boardLike);
        return "좋아요 취소 성공.";
    }

}