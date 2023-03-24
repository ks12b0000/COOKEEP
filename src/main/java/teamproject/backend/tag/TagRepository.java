package teamproject.backend.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.Tag;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByTagName(String tagName);
    @Query(value = "select d.tag_id, b.tag_name, count(d.tag_id) as count from board_tag d join tag b on d.tag_id = b.tag_id group by d.tag_id order by count(d.tag_id) desc limit 10", nativeQuery = true)
    List<Tag> TOP_10_TAG_LISTS();
}
