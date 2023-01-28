package teamproject.backend.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.Tag;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByTagName(String tagName);
}
