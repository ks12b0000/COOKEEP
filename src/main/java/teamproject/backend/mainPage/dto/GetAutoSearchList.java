package teamproject.backend.mainPage.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class GetAutoSearchList {
    List<AutoSearchList> autoSearchLists;

    @Builder
    public GetAutoSearchList(List<AutoSearchList> autoSearchLists) {
        this.autoSearchLists = autoSearchLists;
    }
}
