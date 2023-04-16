package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetNotificationResponse {

    List<NotificationResponse> notificationList;
    int total;

    @Builder
    public GetNotificationResponse(List<NotificationResponse> notificationList, int total) {
        this.notificationList = notificationList;
        this.total = total;
    }
}
