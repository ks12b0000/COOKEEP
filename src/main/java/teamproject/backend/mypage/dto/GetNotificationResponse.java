package teamproject.backend.mypage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetNotificationResponse {

    List<NotificationResponse> notificationList;

    @Builder
    public GetNotificationResponse(List<NotificationResponse> notificationList) {
        this.notificationList = notificationList;
    }
}
