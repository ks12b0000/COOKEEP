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

    private String title;

    private String subTitle;

    private String createDate;
    private String createTime;

    private String notification_url;

    private String userNickName;

    private boolean confirmation;

    @Builder
    public NotificationResponse(Long notification_id, Long user_id, String title, String subTitle, Date createDate, Date createTime, String notification_url, String userNickName, boolean confirmation) {
        this.notification_id = notification_id;
        this.user_id = user_id;
        this.title = title;
        this.subTitle = subTitle;
        this.createDate = asString(createDate);
        this.createTime = asStringToTime(createTime);
        this.notification_url = notification_url;
        this.userNickName = userNickName;
        this.confirmation = confirmation;
    }

    private String asString(Date date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd");
        return format.format(date);
    }

    private String asStringToTime(Date date){
        SimpleDateFormat format = new SimpleDateFormat("HH:mm");
        return format.format(date);
    }
}
