package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    // 유저 아이디
    @Column(length = 13, nullable = false, unique = true)
    private String username;

    // 유저 이메일
    @Column(length = 30, nullable = false)
    private String email;

    // 유저 비밀번호
    @Column(length = 100, nullable = false)
    private String password;

    @OneToMany
    private List<Board> board_list = new LinkedList<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
