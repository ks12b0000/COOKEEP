package teamproject.backend.mainPage.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SearchListResponseAll {
    List<SearchByResponse> boards;
    int total;
}
