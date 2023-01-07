package teamproject.backend.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByTagName(String tagName);
}
