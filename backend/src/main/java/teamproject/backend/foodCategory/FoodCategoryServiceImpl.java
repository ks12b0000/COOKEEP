package teamproject.backend.foodCategory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.foodCategory.dto.FoodCategoryResponse;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FoodCategoryServiceImpl implements FoodCategoryService {

    private final FoodCategoryRepository foodCategoryRepository;

    @Override
    public List<FoodCategoryResponse> getAll() {
        //전체 카테고리 가져오기
        List<FoodCategory> all = foodCategoryRepository.findAll();

        //카테고리 -> 응답용으로 변환
        List<FoodCategoryResponse> allCategory = new ArrayList<>();
        for(FoodCategory foodCategory : all){
            allCategory.add(new FoodCategoryResponse(foodCategory.getCategoryName()));
        }

        return allCategory;
    }

    @Override
    public Long save(String foodCategoryName) {
        //중복 검사

        FoodCategory foodCategory = new FoodCategory(foodCategoryName);
        foodCategoryRepository.save(foodCategory);
        return foodCategory.getCategory_id();
    }

    @Override
    public void delete(String foodCategoryName) {
        //존재 여부 찾기

        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(foodCategoryName);
        foodCategoryRepository.delete(foodCategory);
    }
}
