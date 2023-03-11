package teamproject.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import teamproject.backend.mainPage.dto.SearchByResponse;
import teamproject.backend.mainPage.dto.Top10TagList;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column
    private String tagName;

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    public Top10TagList top10TagList(){
        return Top10TagList.builder()
                .tag_id(getTagId())
                .tag_name(getTagName())
                .build();
    }
}
