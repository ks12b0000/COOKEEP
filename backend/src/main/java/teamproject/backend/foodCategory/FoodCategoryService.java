package teamproject.backend.foodCategory;

import teamproject.backend.foodCategory.dto.FoodCategoryResponse;

import java.util.List;

public interface FoodCategoryService {
    public List<FoodCategoryResponse> getAll();

    public Long save(String foodCategoryName);

    public void delete(String foodCategoryName);
}
