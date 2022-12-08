package teamproject.backend.foodCategory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FoodCategoryResponse {
    private String name;

    public FoodCategoryResponse(String name) {
        this.name = name;
    }
}
