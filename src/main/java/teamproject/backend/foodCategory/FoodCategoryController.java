package teamproject.backend.foodCategory;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.foodCategory.dto.FoodCategoryResponse;
import teamproject.backend.response.BaseResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "FoodCategory", description = "FoodCategory API")
public class FoodCategoryController {

    private final FoodCategoryService foodCategoryService;

    /**
     * 음식 카테고리 조회
     * [GET] /foodCategory/list
     * @return
     */
    @Operation(summary = "카테고리 목록 조회 API", description = "카테고리 목록을 불러온다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 카테고리를 가져왔습니다.")
    })
    @Tag(name = "FoodCategory")
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
    @Operation(summary = "카테고리 삭제 API", description = "카테고리 Name으로 카테고리를 삭제한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 카테고리를 삭제했습니다.")
    })
    @ApiImplicitParam(name = "category", value = "삭제할 카테고리명", required = true, dataTypeClass = String.class)
    @Tag(name = "FoodCategory")
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
    @Operation(summary = "카테고리 추가 API", description = "카테고리 Name으로 카테고리를 추가한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 카테고리를 추가했습니다.")
    })
    @ApiImplicitParam(name = "category", value = "추가할 카테고리명", required = true, dataTypeClass = String.class)
    @Tag(name = "FoodCategory")
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
    @Operation(summary = "카테고리 변경 API", description = "카테고리 Name으로 카테고리를 변경한다.", responses = {
            @ApiResponse(responseCode = "200", description = "성공적으로 카테고리를 변경했습니다.")
    })
    @Tag(name = "FoodCategory")
    @PutMapping("/foodCategory")
    public BaseResponse change_category(@RequestParam String beforeCategory, @RequestParam  String afterCategory){
        foodCategoryService.change(beforeCategory, afterCategory);
        return new BaseResponse("성공적으로" + beforeCategory +"을 " + afterCategory + "로 변경했습니다.");
    }
}
