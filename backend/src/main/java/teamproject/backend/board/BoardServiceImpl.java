package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardLike;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.domain.User;
import teamproject.backend.foodCategory.FoodCategoryRepository;
import teamproject.backend.imageFile.ImageFileRepository;
import teamproject.backend.imageFile.ImageFileService;
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
    private final FoodCategoryRepository foodCategoryRepository;
    private final LikeBoardRepository likeBoardRepository;
    private final ImageFileRepository imageFileRepository;

    private final ImageFileService imageFileService;

    @Override
    @Transactional
    public Long save(BoardWriteRequest boardWriteRequest){
        //유저 검증
        Optional<User> user = userRepository.findById(boardWriteRequest.getUser_id());
        if(user.isEmpty()) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        //음식 카테고리 찾기
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(boardWriteRequest.getCategory());
        if(foodCategory == null) throw new BaseException(NOT_EXIST_CATEGORY);

        //잘못된 섬네일 url 검증
        if(isThumbnailErr(boardWriteRequest.getThumbnail())) throw new BaseException(NOT_EXIST_IMAGE_URL);

        //만약 글에 섬네일 설정이 안되어 있으면 기본값 넣기
        if(boardWriteRequest.getThumbnail() == null) boardWriteRequest.setThumbnail("https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png");

        //글 생성
        Board board = new Board(foodCategory, boardWriteRequest, user.get());

        //글 저장
        boardRepository.save(board);

        //글 아이디 리턴
        return board.getBoard_id();
    }

    @Override
    public BoardReadResponse findById(Long board_id){
        //id 검증
        Optional<Board> board = boardRepository.findById(board_id);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);

        //boardReadResponse 로 리턴
        return new BoardReadResponse(board.get());
    }

    @Override
    public List<BoardReadResponse> findByUserId(Long user_id) {
        List<Board> boards = boardRepository.findByUser_id(user_id);

        List<BoardReadResponse> list = new ArrayList<>();
        for(Board board : boards){
            list.add(new BoardReadResponse(board));
        }

        return list;
    }

    @Override
    public List<BoardReadResponse> findAll() {
        List<Board> boards = boardRepository.findAll();

        List<BoardReadResponse> list = new ArrayList<>();
        for(Board board : boards){
            list.add(new BoardReadResponse(board));
        }

        return list;
    }


    @Override
    public List<BoardReadResponse> findByCategory(String category) {
        //음식 카테고리 찾기
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(category);
        if(foodCategory == null) throw new BaseException(NOT_EXIST_CATEGORY);

        //카테고리에 맞는 글 찾기
        List<Board> searchBoardList = boardRepository.findByCategory(foodCategory);

        //주어진 페이지에 맞게 페이지 자르기
        List<BoardReadResponse> pageBoardList = new ArrayList<>();
        for(Board board : searchBoardList){
            pageBoardList.add(new BoardReadResponse(board));
        }

        //페이지 리턴
        return pageBoardList;
    }

    @Override
    @Transactional
    public void update(Long board_id, BoardWriteRequest boardWriteRequest){
        Optional<Board> board = boardRepository.findById(board_id);

        // 글 아이디 검증
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);

        //유저 검증
        Optional<User> user = userRepository.findById(boardWriteRequest.getUser_id());
        if(user.isEmpty()) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        //음식 카테고리 찾기
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(boardWriteRequest.getCategory());
        if(foodCategory == null) throw new BaseException(NOT_EXIST_CATEGORY);

        //잘못된 섬네일 url 검증
        if(isThumbnailErr(boardWriteRequest.getThumbnail())) throw new BaseException(NOT_EXIST_IMAGE_URL);

        //만약 글에 섬네일 설정이 안되어 있으면 기본값 넣기
        if(boardWriteRequest.getThumbnail() == null) boardWriteRequest.setThumbnail("https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png");

        board.get().update(boardWriteRequest.getTitle(), boardWriteRequest.getText(), boardWriteRequest.getThumbnail());
    }

    @Override
    @Transactional
    public void delete(Long user_id, Long board_id) {
        //글 찾기
        Optional<Board> board = boardRepository.findById(board_id);
        if(board.isEmpty()) throw new BaseException(NOT_EXIST_BOARD);

        //유저가 맞는지 확인
        if(board.get().getUser().getId() != user_id) throw new BaseException(UNAUTHORIZED_USER_ACCESS);

        //글에 존재하는 사진 삭제
        deleteImageAll(board.get());

        //글에 좋아요 한 경우 삭제
        List<BoardLike> likeList = likeBoardRepository.findByBoard(board.get());
        for(BoardLike like : likeList){
            likeBoardRepository.delete(like);
        }

        //글 삭제
        boardRepository.delete(board.get());
    }
    private void deleteImageAll(Board board){
        //섬네일 사진 삭제
        String thumbnailURL = board.getThumbnail();

        if(thumbnailURL != "https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png") {
            imageFileService.delete(thumbnailURL);
        }
        //글 속 사진 삭제 - 개발중
        //List<String> imageUrlInText = getImageUrlInText(board.getText());
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
    @Override
    @Transactional
    public void delete_err_thumbnail(){
        List<Board> list = boardRepository.findAll();

        for(Board board : list){
            if(isThumbnailErr(board.getThumbnail())){
                delete(board.getUser().getId(), board.getBoard_id());
            }
        }
    }

    private boolean isThumbnailErr(String thumbnail){
        if(thumbnail == "https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/defaultImage.png") return false;

        //url 주소 문제
        if(!thumbnail.startsWith("https://teamproject-s3.s3.ap-northeast-2.amazonaws.com/")){
            return true;
        }

        //이미지 파일 레포에 없는 경우
        if(imageFileRepository.findByUrl(thumbnail) == null){
            return true;
        }

        return false;
    }

    private int getStartIndex(int allCnt, int curPage){
        if(curPage < 1) return 0;
        if(allCnt < (curPage - 1) * 8) return (allCnt % 8) * 8;
        return (curPage - 1) * 8;
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
