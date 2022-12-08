package teamproject.backend.foodCategory;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.foodCategory.dto.FoodCategoryResponse;
import teamproject.backend.response.BaseResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FoodCategoryController {

    private final FoodCategoryService foodCategoryService;

    @GetMapping("/foodCategory/list")
    public BaseResponse<List<FoodCategoryResponse>> board_list(){
        List<FoodCategoryResponse> categoryList = foodCategoryService.getAll();
        return new BaseResponse<>("성공적으로 카테고리를 가져왔습니다.", categoryList);
    }
}
