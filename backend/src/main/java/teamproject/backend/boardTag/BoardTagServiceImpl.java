package teamproject.backend.boardTag;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import teamproject.backend.board.BoardService;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;
import teamproject.backend.tag.TagService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardTagServiceImpl implements BoardTagService{

    private final BoardTagRepository boardTagRepository;
    private final TagService tagService;

    @Override
    public void saveTags(Board board, String tagRequest) {
        List<String> tagNames = splitTagName(tagRequest);
        for(String tagName : tagNames){
            Tag tag = getTag(tagName);
            boardTagRepository.save(new BoardTag(board,tag));
        }
    }

    private Tag getTag(String tagName){
        if(!tagService.exist(tagName)){
            tagService.save(tagName);
        }
        return tagService.findByName(tagName);
    }
    private List<String> splitTagName(String tags){
        String[] tagArray = tags.split("#");
        List<String> tagNames = new ArrayList<>();
        for(String tagName : tagArray){
            if(usableTagName(tagName)){
                tagNames.add(deleteLastChar(tagName));
            }
        }
        return tagNames;
    }

    private String deleteLastChar(String name){
        return name.substring(0, name.length() - 1);
    }

    private boolean usableTagName(String tagName){
        if(tagName.length() < 1) return false;
        return true;
    }
    @Override
    public void deleteAllByBoard(Board board) {
        List<BoardTag> boardTags = findBoardTagByBoard(board);
        for(BoardTag boardTag : boardTags){
            boardTagRepository.delete(boardTag);
        }
    }

    @Override
    public List<BoardTag> findBoardTagByBoard(Board board) {
        List<BoardTag> boardTags = boardTagRepository.findByBoard(board);
        return boardTags;
    }

    @Override
    public String findTagsByBoard(Board board) {
        List<BoardTag> boardTags = findBoardTagByBoard(board);
        String tags = "";
        for(BoardTag boardTag : boardTags){
            tags += "#" + boardTag.getTag().getTagName() + " ";
        }
        return tags;
    }

    @Override
    public List<BoardTag> findBoardTagByTagName(String tagName) {
        Tag tag = getTag(tagName);
        List<BoardTag> boardTags = boardTagRepository.findByTag(tag);
        return boardTags;
    }

    @Override
    public List<Board> findBoardByTagName(String tagName) {
        List<BoardTag> boardTags = findBoardTagByTagName(tagName);
        List<Board> boards = new ArrayList<>();
        for(BoardTag boardTag : boardTags){
            boards.add(boardTag.getBoard());
        }
        return boards;
    }

}
