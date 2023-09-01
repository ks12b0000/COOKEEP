package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.*;
import teamproject.backend.boardComment.BoardCommentRepository;
import teamproject.backend.boardComment.dto.BoardCommentResponse;
import teamproject.backend.boardCommentReply.BoardCommentReplyRepository;
import teamproject.backend.boardTag.BoardTagService;
import teamproject.backend.domain.*;
import teamproject.backend.foodCategory.FoodCategoryService;
import teamproject.backend.imageFile.ImageFileRepository;
import teamproject.backend.imageFile.ImageFileService;
import teamproject.backend.like.LikeBoardRepository;
import teamproject.backend.mypage.dto.BoardByUserResponse;
import teamproject.backend.mypage.dto.LikeAndCommentByUserResponse;
import teamproject.backend.response.BaseException;
import teamproject.backend.user.UserRepository;
import teamproject.backend.utils.recommend.RecommendManager;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static teamproject.backend.response.BaseExceptionStatus.*;

@Slf4j
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
    private final ImageFileService imageFileService;

    @Qualifier("boardRecommendManager")
    private final RecommendManager boardRecommendManager;

    private static final String DEFAULT_IMAGE_URL = "https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png";
    @Override
    @Transactional
    public Long save(BoardWriteRequest boardWriteRequest){
        Board board = createBoard(boardWriteRequest);
        boardRepository.save(board);
        boardTagService.saveBoardTags(board, boardWriteRequest.getTags());
        imageFileService.deleteSaveImages(boardWriteRequest.getUser_id(), board.getBoardId());
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
    public BoardResponseInDetailFormat findBoardById(Long boardId){
        Board board = findBoardByBoardId(boardId);
        String tags = boardTagService.findTagsByBoard(board);
        boardRepository.updateView(board.getBoardId());
        Long commentCnt = boardCommentRepository.CountBoardComment(boardId);
        List<ImageResponse> imageResponses = findImages(boardId, board);

        return new BoardResponseInDetailFormat(board, commentCnt, imageResponses, tags);
    }

    private List<ImageResponse> findImages(Long boardId, Board board) {
        List<ImageFile> imageFiles = imageFileRepository.findByBoardId(boardId);
        List<ImageResponse> imageResponses = new LinkedList<>();
        for (ImageFile imageFile : imageFiles) {
            if (!imageFile.getUrl().equals(board.getThumbnail())) {
                imageResponses.add(new ImageResponse(imageFile.getUrl()));
            }
        }
        return imageResponses;
    }

    private Board findBoardByBoardId(Long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);
        return board.get();
    }

    private void inputTags(List<BoardResponseInCardFormat> boards) {
        for(BoardResponseInCardFormat board : boards){
            Board board1 = findBoardByBoardId(board.getBoard_id());
            String tags = boardTagService.findTagsByBoard(board1);
            board.setTags(tags);
        }
    }

    private List<BoardResponseInCardFormat> getBoardResponsesInCardFormat(List<Board> boards, int length){
        List<BoardResponseInCardFormat> responses = new ArrayList<>();
        int min = Math.min(boards.size(), length);
        for(int i = 0; i < min; i++){
            Board board = boards.get(i);
            String tags = boardTagService.findTagsByBoard(board);
            Long commentCnt = boardCommentRepository.CountBoardComment(board.getBoardId());
            responses.add(new BoardResponseInCardFormat(board, tags, commentCnt));
        }
        return responses;
    }

    /**
     * 카테고리별 글 목록
     * @param categoryName
     * @return
     */
    @Override
    public BoardListResponseByCategory findBoardListByFoodCategoryName(Pageable pageable, String categoryName) {
        FoodCategory foodCategory = foodCategoryService.getFoodCategory(categoryName);

        Page<Board> boards = boardRepository.findByCategory(pageable,foodCategory);
        return new BoardListResponseByCategory(getBoardResponsesInCardFormat(boards.getContent(), boards.getSize()), boards.getTotalPages());
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
        boardTagService.updateBoardTags(board, boardWriteRequest.getTags());
        imageFileService.deleteSaveImages(boardWriteRequest.getUser_id(), boardId);
    }

    private BoardComment getBoardComment(Long request) {
        Optional<BoardComment> comment = boardCommentRepository.findById(request);
        if(comment.isEmpty()) throw new BaseException(NOT_EXIST_COMMENT);
        return comment.get();
    }

    private void deleteAllReplyOf(BoardComment comment) {
        List<BoardCommentReply> replies = boardCommentReplyRepository.findAllByBoardComment(comment);
        for(BoardCommentReply reply : replies){
            boardCommentReplyRepository.delete(reply);
        }
    }

    private List<BoardCommentResponse> getBoardCommentResponses(List<BoardComment> comments) {
        List<BoardCommentResponse> list = new LinkedList<>();
        for (BoardComment comment : comments){
            list.add(new BoardCommentResponse(comment));
        }
        return list;
    }

    private BoardCommentReply getBoardCommentReply(Long replyId) {
        Optional<BoardCommentReply> reply = boardCommentReplyRepository.findById(replyId);
        if(reply.isEmpty()) throw new BaseException(NOT_EXIST_REPLY);
        return reply.get();
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

        if(boardRecommendManager.isContains(boardId)) boardRecommendManager.update(boardId);

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

    private void deleteImageAll(Board board){
        List<ImageFile> imageFiles = imageFileRepository.findByBoardId(board.getBoardId());
        for(ImageFile imageFile : imageFiles){
            imageFileService.delete(imageFile.getFileName());
        }
    }


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

    /**
     * 게시글 전체 목록
     * @param
     * @return
     */
    public BoardListResponseAll findBoarListByAll(Pageable pageable) {
        Page<Board> boards = boardRepository.findAll(pageable);

        return new BoardListResponseAll(getBoardResponsesInCardFormat(boards.getContent(), boards.getSize()), boards.getTotalPages());
    }

    /**
     * 좋아요순 5개 가져오기
     * @return
     */
    public List<BoardResponseInCardFormat> findBoarListByLiked() {
        List<Board> boards = boardRepository.findTop5ByOrderByLikedDesc();

        return getBoardResponsesInCardFormat(boards, boards.size());
    }

    /**
     * 조회순 5개 가져오기
     * @return
     */
    public List<BoardResponseInCardFormat> findBoarViewedByCommented() {
        List<Board> boards = boardRepository.findTop5ByOrderByViewDesc();

        return getBoardResponsesInCardFormat(boards, boards.size());
    }

    /**
     * 좋아요순 10개 가져오기
     * @return
     */
    public List<BoardResponseInCardFormat> findBoarListByLikedMore() {
        List<Board> boards = boardRepository.findTop10ByOrderByLikedDesc();

        return getBoardResponsesInCardFormat(boards, boards.size());
    }

    /**
     * 조회순 10개 가져오기
     * @return
     */
    public List<BoardResponseInCardFormat> findBoarViewedByCommentedMore() {
        List<Board> boards = boardRepository.findTop10ByOrderByViewDesc();

        return getBoardResponsesInCardFormat(boards, boards.size());
    }

    public UserBoardResponseInListFormat findBoardListByUser(Pageable pageable, Long userId){
        User user = getUserById(userId);
        Page<Board> boards = boardRepository.findByUserId(pageable, userId);
        return new UserBoardResponseInListFormat(getBoardByResponse(boards.getContent(), boards.getSize()), user, boards.getTotalPages());
    }
    private List<BoardByUserResponse> getBoardByResponse(List<Board> boards, int length){
        List<BoardByUserResponse> responses = new ArrayList<>();
        int min = Math.min(boards.size(), length);
        for(int i = 0; i < min; i++){
            Board board = boards.get(i);
            Long commentCnt = boardCommentRepository.CountBoardComment(board.getBoardId());
            responses.add(new BoardByUserResponse(board, commentCnt));
        }
        return responses;
    }

    public CheckUserLikeBoard checkLiked(Long userId, Long boardId){
        User user = getUserById(userId);
        return getLikeBoard(user, boardId);
    }

    private CheckUserLikeBoard getLikeBoard( User user, Long boardId) {
        Board board = null;
        boolean check = false;
        try {
            board = findBoardByBoardId(boardId);
            check = likeBoardRepository.existsByBoardAndUser(board, user);
        }
        catch (Exception e){

        }
        return new CheckUserLikeBoard(check, boardId);
    }

    public List<CheckUserLikeBoard> checkLikedList(Long userId, List<Long> boardIds){
        User user = getUserById(userId);
        List<CheckUserLikeBoard> list = new ArrayList<>();
        for(Long boardId : boardIds){
            list.add(getLikeBoard(user, boardId));
        }
        return list;
    }
}