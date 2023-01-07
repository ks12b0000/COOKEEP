package teamproject.backend.boardTag;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardTagServiceImpl implements BoardTagService{

    private final BoardTagRepository boardTagRepository;

    @Override
    public void saveTags(Board board, List<Tag> tags) {
        for(Tag tag : tags){
            BoardTag boardTag = new BoardTag(board, tag);
            boardTagRepository.save(boardTag);
        }
    }

    @Override
    public void deleteAllByBoard(Board board) {
        List<BoardTag> boardTags = findByBoard(board);
        for(BoardTag boardTag : boardTags){
            boardTagRepository.delete(boardTag);
        }
    }

    @Override
    public List<BoardTag> findByBoard(Board board) {
        List<BoardTag> boardTags = boardTagRepository.findByBoard(board);
        return boardTags;
    }

    @Override
    public List<BoardTag> findByTag(Tag tag) {
        List<BoardTag> boardTags = boardTagRepository.findByTag(tag);
        return boardTags;
    }

}
