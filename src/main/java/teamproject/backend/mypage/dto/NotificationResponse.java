package teamproject.backend.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.User;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
public class NotificationResponse {

    private Long notification_id;

    private Long user_id;

    private String message;

    private String createDate;

    private String notification_url;

    @Builder
    public NotificationResponse(Long notification_id, Long user_id, String message, Date createDate, String notification_url) {
        this.notification_id = notification_id;
        this.user_id = user_id;
        this.message = message;
        this.createDate = asString(createDate);
        this.notification_url = notification_url;
    }

    private String asString(Date date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return format.format(date);
    }
}
