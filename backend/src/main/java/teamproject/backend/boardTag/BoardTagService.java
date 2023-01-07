package teamproject.backend.boardTag;

import teamproject.backend.domain.Board;
import teamproject.backend.domain.BoardTag;
import teamproject.backend.domain.Tag;

import java.util.List;

public interface BoardTagService {
    void saveTags(Board board, String tagRequest);
    void deleteAllByBoard(Board board);
    List<BoardTag> findByBoard(Board board);
    List<BoardTag> findByTag(Tag tag);
}
