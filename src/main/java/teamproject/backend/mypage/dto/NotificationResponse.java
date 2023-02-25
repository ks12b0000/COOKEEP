package teamproject.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.util.Date;

@Getter
@NoArgsConstructor
public class NotificationResponse {

    private Long notification_id;

    private Long user_id;

    private Long board_id;

    private String message;

    private Date createDate;

    private String notification_url;

    @Builder
    public NotificationResponse(Long notification_id, Long user_id, Long board_id, String message, Date createDate, String notification_url) {
        this.notification_id = notification_id;
        this.user_id = user_id;
        this.board_id = board_id;
        this.message = message;
        this.createDate = createDate;
        this.notification_url = notification_url;
    }
}
