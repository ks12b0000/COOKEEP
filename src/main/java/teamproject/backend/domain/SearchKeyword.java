package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.mainPage.dto.AutoSearchList;
import teamproject.backend.mainPage.dto.Top10SearchList;
import teamproject.backend.mainPage.dto.Top10TagList;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class SearchKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_id")
    private Long id;
    @Column
    private String keyword;
    @Column
    private Integer searched;

    public void increaseSearchCount() {
        this.searched += 1;
    }

    public SearchKeyword(String searchKeyword) {
        this.keyword = searchKeyword;
        this.searched = 1;
    }

    public Top10SearchList top10SearchList(){
        return Top10SearchList.builder()
                .search_id(getId())
                .keyword(getKeyword())
                .build();
    }

    public AutoSearchList autoSearchList(){
        return AutoSearchList.builder()
                .keyword(getKeyword())
                .build();
    }
}
