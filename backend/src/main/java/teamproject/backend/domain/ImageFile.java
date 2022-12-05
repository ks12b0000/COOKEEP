package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class ImageFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageFile_id;

    @Column
    private String fileName;

    @Column
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ImageFile(String fileName, String url, User user) {
        this.fileName = fileName;
        this.url = url;
        this.user = user;
    }
}
