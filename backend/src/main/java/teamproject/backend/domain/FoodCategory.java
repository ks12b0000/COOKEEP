package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class FoodCategory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_id;

    @Column(name = "category_Name")
    private String categoryName;

    public FoodCategory(String categoryName) {
        this.categoryName = categoryName;
    }
}
