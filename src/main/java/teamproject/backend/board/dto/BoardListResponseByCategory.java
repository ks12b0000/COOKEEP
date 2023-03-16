package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListResponseByCategory {
    private List<BoardResponseInCardFormat> boards;
    private int total;

}
