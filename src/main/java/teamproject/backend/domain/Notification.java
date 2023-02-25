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

    @ManyToOne
    @JoinColumn(name = "board_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @Column
    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date notification_time;

    @Column
    private String notification_url;


    public Notification(User user, String message, String notification_url) {
        this.user = user;
        this.message = message;
        this.notification_time = new Date(System.currentTimeMillis());
        this.notification_url = notification_url;
    }

    public Notification (User user, String message, String notification_url, Board board) {
        this.user = user;
        this.message = message;
        this.notification_time = new Date(System.currentTimeMillis());
        this.notification_url = notification_url;
        this.board = board;
    }

    public NotificationResponse toDto(){
        return NotificationResponse.builder()
                .notification_id(id)
                .user(user)
                .board(board)
                .message(message)
                .notification_time(notification_time)
                .notification_url(notification_url)
                .build();
    }
}
