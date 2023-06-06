package teamproject.backend.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import teamproject.backend.mypage.dto.NotificationResponse;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column
    private String title;

    @Column
    private String subTitle;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column
    private String notification_url;

    @Column(nullable = false)
    private boolean confirmation;

    @Column
    private String category;

    public Notification (User user, String title, String subTitle, String notification_url, String category) {
        this.user = user;
        this.title = title;
        this.subTitle = subTitle;
        this.createDate = new Date(System.currentTimeMillis());
        this.notification_url = notification_url;
        this.confirmation = false;
        this.category = category;
    }

    public NotificationResponse toDto(){
        return NotificationResponse.builder()
                .notification_id(id)
                .user_id(user.getId())
                .title(title)
                .subTitle(subTitle)
                .createDate(createDate)
                .createTime(createDate)
                .notification_url(notification_url)
                .confirmation(confirmation)
                .build();
    }

    public void updateConfirmation() {
        this.confirmation = true;
    }
}
