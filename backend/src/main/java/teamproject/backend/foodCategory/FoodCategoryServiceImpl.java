package teamproject.backend.foodCategory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.foodCategory.dto.FoodCategoryResponse;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;

import java.util.ArrayList;
import java.util.List;

import static teamproject.backend.response.BaseExceptionStatus.NOT_EXIST_CATEGORY;


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
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(foodCategoryName);
        if(foodCategory != null) throw new BaseException(BaseExceptionStatus.EXIST_CATEGORY);

        FoodCategory newFoodCategory = new FoodCategory(foodCategoryName);
        foodCategoryRepository.save(newFoodCategory);
        return newFoodCategory.getCategory_id();
    }

    @Override
    @Transactional
    public void delete(String foodCategoryName) {
        //존재 여부 찾기
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(foodCategoryName);
        if(foodCategory == null) throw new BaseException(BaseExceptionStatus.NOT_EXIST_CATEGORY);

        foodCategoryRepository.delete(foodCategory);
    }

    @Override
    @Transactional
    public void change(String before, String after) {
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(before);

        foodCategory.setCategoryName(after);
    }

    @Override
    public FoodCategory getFoodCategory(String name) {
        FoodCategory foodCategory = foodCategoryRepository.findByCategoryName(name);
        if(foodCategory == null) throw new BaseException(NOT_EXIST_CATEGORY);
        return foodCategory;
    }
}
