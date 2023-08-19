package teamproject.backend.foodCategory;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.FoodCategory;
import teamproject.backend.foodCategory.dto.FoodCategoryResponse;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Transactional
@Slf4j
@ExtendWith(MockitoExtension.class)
public class FoodCategoryServiceTest {

    @InjectMocks
    private FoodCategoryServiceImpl foodCategoryService;

    @Mock
    private FoodCategoryRepository foodCategoryRepository;

    @Test
    @DisplayName("카테고리 목록 조회")
    void getAllCategory() {
        // given
        FoodCategory foodCategory = new FoodCategory("test");
        List<FoodCategory> foodCategories = new ArrayList<>();
        foodCategories.add(foodCategory);

        // stub
        when(foodCategoryRepository.findAll()).thenReturn(foodCategories);

        // when
        List<FoodCategoryResponse> foodCategoryResponses = foodCategoryService.getAll();

        // then
        assertAll(
                () -> assertThat(foodCategoryResponses).isNotNull(),
                () -> assertThat(foodCategoryResponses.get(0).getName()).isEqualTo("test")
        );
    }

    @Test
    @DisplayName("카테고리 저장")
    void saveCategory() {
        // given
        FoodCategory foodCategory = new FoodCategory("test");

        // stub
        when(foodCategoryRepository.findByCategoryName(foodCategory.getCategoryName())).thenReturn(null);
        when(foodCategoryRepository.save(any())).thenReturn(foodCategory);

        // when
        Long save = foodCategoryService.save(foodCategory.getCategoryName());

        // then
        assertAll(
                () -> assertThat(save).isEqualTo(foodCategory.getCategoryId())
        );
    }

}
