package teamproject.backend.response.foodCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.FoodCategory;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {
    FoodCategory findByCategoryName(String categoryName);
}
