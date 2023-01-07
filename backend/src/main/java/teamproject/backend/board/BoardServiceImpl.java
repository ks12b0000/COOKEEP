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
    private final String DEFAULT_IMAGE_URL = "https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png";
    @Override
    @Transactional
    public Long save(BoardWriteRequest boardWriteRequest){
        Board board = createBoard(boardWriteRequest);
        boardRepository.save(board);
        boardTagService.saveTags(board, boardWriteRequest.getTags());
        return board.getBoard_id();
    }

    private Board createBoard(BoardWriteRequest boardWriteRequest) {
        User user = getUserById(boardWriteRequest.getUser_id());
        FoodCategory foodCategory = foodCategoryService.getFoodCategory(boardWriteRequest.getCategory());

        if(boardWriteRequest.getThumbnail() == null) boardWriteRequest.setThumbnail(DEFAULT_IMAGE_URL);
        if(!thumbnailExist(boardWriteRequest.getThumbnail())) throw new BaseException(NOT_EXIST_IMAGE_URL);

        Board board = new Board(foodCategory, boardWriteRequest, user);
        return board;
    }

    private User getUserById(Long user_id) {
        Optional<User> user = userRepository.findById(user_id);
        if(user.isEmpty()) throw new BaseException(USER_NOT_EXIST);
        return user.get();
    }

    @Override
    public BoardReadResponse getBoardReadResponseByBoardId(Long board_id){
        Board board = getBoardByBoardId(board_id);
        return new BoardReadResponse(board);
    }

    @Override
    public Board getBoardByBoardId(Long board_id) {
        Optional<Board> board = boardRepository.findById(board_id);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);
        return board.get();
    }

    @Override
    public List<BoardReadResponse> getBoardReadResponseListByUserId(Long user_id) {
        List<Board> boards = boardRepository.findByUser_id(user_id);

        List<BoardReadResponse> responses = new ArrayList<>();
        for(Board board : boards){
            responses.add(new BoardReadResponse(board));
        }

        return responses;
    }

    @Override
    public List<BoardReadResponse> getBoardReadResponseListByFoodCategoryName(String categoryName) {
        FoodCategory foodCategory = foodCategoryService.getFoodCategory(categoryName);
        List<Board> boards = boardRepository.findByCategory(foodCategory);

        List<BoardReadResponse> responses = new ArrayList<>();
        for(Board board : boards){
            responses.add(new BoardReadResponse(board));
        }

        return responses;
    }

    @Override
    @Transactional
    public void update(Long board_id, BoardWriteRequest boardWriteRequest){
        Board board = getBoardByBoardId(board_id);
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
        Board board = getBoardByBoardId(boardCommentWriteRequest.getBoard_id());
        User user = getUserById(boardCommentWriteRequest.getUser_id());

        BoardComment comment = new BoardComment(user, board, boardCommentWriteRequest.getText());
        boardCommentRepository.save(comment);

        return comment.getBoardComment_id();
    }

    @Override
    @Transactional
    public void updateComment(BoardCommentUpdateRequest request) {
        Optional<BoardComment> comment = boardCommentRepository.findById(request.getBoardComment_id());

        //댓글 존재 유무 확인
        if(comment.isEmpty()) throw new BaseException(NOT_EXIST_COMMENT);

        //유저 검증
        getUserById(request.getUser_id());

        comment.get().setText(request.getText());
    }

    @Override
    @Transactional
    public void deleteComment(Long comment_id, Long user_id) {
        Optional<BoardComment> comment = boardCommentRepository.findById(comment_id);

        //댓글 존재 유무 확인
        if(comment.isEmpty()) throw new BaseException(NOT_EXIST_COMMENT);

        //댓글 본인 확인
        if(comment.get().getUser().getId() != user_id) throw new BaseException(USER_NOT_EXIST);

        //reply 삭제

        //댓글 삭제
        boardCommentRepository.delete(comment.get());
    }

    @Override
    public List<BoardCommentResponse> findCommentByBoardId(Long board_id) {
        Optional<Board> board = boardRepository.findById(board_id);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);

        List<BoardComment> comments = boardCommentRepository.findByBoard(board.get());

        List<BoardCommentResponse> list = new LinkedList<>();
        for (BoardComment comment : comments){
            list.add(new BoardCommentResponse(comment));
        }

        return list;
    }

    @Override
    public List<BoardCommentResponse> findCommentByUserId(Long user_id) {
        User user = getUserById(user_id);

        List<BoardComment> comments = boardCommentRepository.findByUser(user);

        List<BoardCommentResponse> list = new LinkedList<>();
        for (BoardComment comment : comments){
            list.add(new BoardCommentResponse(comment));
        }

        return list;
    }

    @Override
    @Transactional
    public Long saveReply(BoardCommentReplyWriteRequest request) {
        //댓글이 존재하는지 확인
        Optional<BoardComment> comment = boardCommentRepository.findById(request.getComment_id());
        if(comment.isEmpty()) throw new BaseException(NOT_EXIST_COMMENT);

        //유저가 존재하는지 확인
        User user = getUserById(request.getUser_id());

        //답글 제작
        BoardCommentReply reply = new BoardCommentReply(user, comment.get(), request.getText());

        //답글 저장
        boardCommentReplyRepository.save(reply);

        //댓글에 replyCnt + 1
        comment.get().increaseReplyCount();

        return reply.getBoardCommentReply_id();
    }

    @Override
    @Transactional
    public void updateReply(BoardCommentReplyUpdateRequest request) {
        //딥글이 존재하는지 확인
        Optional<BoardCommentReply> reply = boardCommentReplyRepository.findById(request.getReply_id());
        if(reply.isEmpty()) throw new BaseException(NOT_EXIST_REPLY);

        //유저가 존재하는지 확인
        getUserById(request.getUser_id());

        //답글 수정
        reply.get().setText(request.getText());

    }

    @Override
    @Transactional
    public void deleteReply(Long reply_id, Long user_id) {
        //딥글이 존재하는지 확인
        Optional<BoardCommentReply> reply = boardCommentReplyRepository.findById(reply_id);
        if(reply.isEmpty()) throw new BaseException(NOT_EXIST_REPLY);

        //유저가 존재하는지 확인
        getUserById(user_id);

        //댓글의 replyCnt - 1
        reply.get().getBoardComment().decreaseReplyCount();

        //답글 삭제
        boardCommentReplyRepository.delete(reply.get());
    }

    @Override
    public List<BoardCommentReplyResponse> findReplyByCommentId(Long comment_id) {
        Optional<BoardComment> boardComment = boardCommentRepository.findById(comment_id);
        if(boardComment.isEmpty()) throw new BaseException(NOT_EXIST_COMMENT);

        List<BoardCommentReply> replies = boardCommentReplyRepository.findByBoardComment(boardComment.get());
        System.out.println(replies.size());
        List<BoardCommentReplyResponse> list = new LinkedList<>();
        for(BoardCommentReply reply : replies){
            list.add(new BoardCommentReplyResponse(reply));
        }

        return list;
    }

    @Override
    @Transactional
    public void delete(Long user_id, Long board_id) {
        Board board = getBoardByBoardId(board_id);
        User requestUser = getUserById(user_id);
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

    private List<String> getImageUrlInText(String text){
        List<String> urls = new LinkedList<>();

        return null;
    }


    @Override
    @Transactional
    public String updateLikeOfBoard(Long board_id, User user) {
        Board board = boardRepository.findById(board_id).orElseThrow(() -> new BaseException(NOT_EXIST_BOARD));
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