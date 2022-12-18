package teamproject.backend.foodCategory;

import teamproject.backend.foodCategory.dto.FoodCategoryResponse;

import java.util.List;

public interface FoodCategoryService {
    List<FoodCategoryResponse> getAll();

    Long save(String foodCategoryName);

    void delete(String foodCategoryName);

    void change(String before, String after);
}
