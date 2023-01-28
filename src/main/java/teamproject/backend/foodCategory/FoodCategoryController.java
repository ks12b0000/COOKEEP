package teamproject.backend.foodCategory;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.foodCategory.dto.FoodCategoryResponse;
import teamproject.backend.response.BaseResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FoodCategoryController {

    private final FoodCategoryService foodCategoryService;

    /**
     * 음식 카테고리 조회
     * [GET] /foodCategory/list
     * @return
     */
    @GetMapping("/foodCategory/list")
    public BaseResponse<List<FoodCategoryResponse>> category_list(){
        List<FoodCategoryResponse> categoryList = foodCategoryService.getAll();
        return new BaseResponse<>("성공적으로 카테고리를 가져왔습니다.", categoryList);
    }

    /**
     * 음식 카테고리 삭제
     * [DELETE] /foodCategory
     * @param category
     * @return
     */
    @DeleteMapping("/foodCategory")
    public BaseResponse delete_category(@RequestParam String category){
        foodCategoryService.delete(category);
        return new BaseResponse("성공적으로" + category +"을 삭제했습니다.");
    }

    /**
     * 음식 카테고리 추가
     * [POST] /foodCategory
     * @param category
     * @return
     */
    @PostMapping("/foodCategory")
    public BaseResponse add_category(@RequestParam String category){
        foodCategoryService.save(category);
        return new BaseResponse("성공적으로" + category +"을 추가했습니다.");
    }

    /**
     * 음식 카테고리 변경
     * [PUT] /foodCategory
     * @param beforeCategory
     * @param afterCategory
     * @return
     */
    @PutMapping("/foodCategory")
    public BaseResponse change_category(@RequestParam String beforeCategory, @RequestParam  String afterCategory){
        foodCategoryService.change(beforeCategory, afterCategory);
        return new BaseResponse("성공적으로" + beforeCategory +"을 " + afterCategory + "로 변경했습니다.");
    }
}
