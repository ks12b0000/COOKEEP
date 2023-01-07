package teamproject.backend.tag;

import teamproject.backend.domain.Tag;

import java.util.List;

public interface TagService {
    Long save(String tagName);
    void delete(Long tag_id);
    Tag findById(Long tag_id);
    Tag findByName(String tagName);
    List<Tag> findAll();
    boolean exist(String tagName);
}
