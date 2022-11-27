package teamproject.backend.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardReadResponse;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.user.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long save(BoardWriteRequest boardWriteRequest){
        //유저 검증
        Optional<User> user = userRepository.findById(boardWriteRequest.getUser_id());
        if(user.isEmpty()) throw new BaseException(BaseExceptionStatus.SERVER_INTERNAL_ERROR); // 추후에 4001로 변경

        //글 생성
        Board board = new Board(boardWriteRequest, user.get());

        //글 저장
        boardRepository.save(board);

        //글 아이디 리턴
        return board.getBoard_id();
    }

    @Override
    public BoardReadResponse findById(Long board_id){
        //id 검증
        Optional<Board> board = boardRepository.findById(board_id);
        if(board.isEmpty()) throw new BaseException(BaseExceptionStatus.NOT_EXIST_BOARD);

        //boardReadResponse 로 리턴
        return new BoardReadResponse(board.get());
    }

    @Override
    public List<BoardReadResponse> getBoards(String category, int page) {
        //카테고리에 맞는 글 찾기
        List<Board> searchBoardList = boardRepository.findByCategory(category);

        //페이지에 맞게 index 구하기
        int searchBoardCnt = searchBoardList.size();
        int startIndex = getStartIndex(searchBoardCnt, page);
        int endIndex = Math.min(startIndex + 7, searchBoardCnt - 1);

        //주어진 페이지에 맞게 페이지 자르기
        List<BoardReadResponse> pageBoardList = new ArrayList<>();
        for(int i = startIndex; i <= endIndex; i++){
            pageBoardList.add(new BoardReadResponse(searchBoardList.get(i)));
        }

        //페이지 리턴
        return pageBoardList;
    }

    private void checkPage(int allCnt, int curPage){
        if(curPage < 1) throw new BaseException(BaseExceptionStatus.LESS_PAGE_NUMBER);
        if(allCnt < (curPage - 1) * 8) throw new BaseException(BaseExceptionStatus.OVER_PAGE_NUMBER);
    }

    private int getStartIndex(int allCnt, int curPage){
        if(curPage < 1) return 0;
        if(allCnt < (curPage - 1) * 8) return (allCnt % 8) * 8;
        return (curPage - 1) * 8;
    }
}
