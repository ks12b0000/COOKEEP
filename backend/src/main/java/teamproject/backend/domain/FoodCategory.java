package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class FoodCategory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_id;

    @Column
    private String categoryName;

    @OneToMany
    private List<Board> board_list = new LinkedList<>();

    public FoodCategory(String categoryName) {
        this.categoryName = categoryName;
    }
}
