package teamproject.backend.response.foodCategory;

import teamproject.backend.response.foodCategory.dto.FoodCategoryResponse;

import java.util.List;

public interface FoodCategoryService {
    public List<FoodCategoryResponse> getAll();

    public Long save(String foodCategoryName);

    public void delete(String foodCategoryName);
}
