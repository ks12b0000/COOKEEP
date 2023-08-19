package teamproject.backend.board;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.board.dto.BoardWriteRequest;
import teamproject.backend.boardTag.BoardTagRepository;
import teamproject.backend.boardTag.BoardTagService;
import teamproject.backend.boardTag.BoardTagServiceImpl;
import teamproject.backend.domain.*;
import teamproject.backend.foodCategory.FoodCategoryRepository;
import teamproject.backend.foodCategory.FoodCategoryService;
import teamproject.backend.foodCategory.FoodCategoryServiceImpl;
import teamproject.backend.imageFile.ImageFileRepository;
import teamproject.backend.imageFile.ImageFileService;
import teamproject.backend.tag.TagRepository;
import teamproject.backend.tag.TagService;
import teamproject.backend.tag.TagServiceImpl;
import teamproject.backend.user.UserRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Transactional
@Slf4j
@ExtendWith(MockitoExtension.class)
public class BoardServiceTest {

    @InjectMocks
    private BoardServiceImpl boardService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BoardRepository boardRepository;

    @Mock
    private FoodCategoryService foodCategoryService;

    @Mock
    private ImageFileRepository imageFileRepository;

    @Mock
    private BoardTagService boardTagService;

    @Mock
    private ImageFileService imageFileService;


    @Test
    @DisplayName("게시글 저장")
    void boardSave() {
        // given
        User user = new User("test1234", "test122", "test1234@gmail.com", "test1234", null);
        BoardWriteRequest boardWriteRequest = new BoardWriteRequest("testCategory", "title12", "text123", user.getId(), "testThumbnail", "tag1");
        FoodCategory foodCategory = new FoodCategory("testCategory");
        Board board = new Board(foodCategory, boardWriteRequest, user);

        // stub
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(imageFileRepository.findByUrl(boardWriteRequest.getThumbnail())).thenReturn(new ImageFile());
        when(boardRepository.save(any())).thenReturn(board);

        // when
        Long boardId = boardService.save(boardWriteRequest);

        // then
        assertThat(boardId).isEqualTo(board.getBoardId());
    }
}
