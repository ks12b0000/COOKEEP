package teamproject.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseInBannerFormat {
    private Long board_id;
    private String category;
    private String title;
    private String user_name;
    private String thumbnail;
    private String tags;
}
