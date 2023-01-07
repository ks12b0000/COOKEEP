package teamproject.backend.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import teamproject.backend.domain.Tag;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{
    private final TagRepository tagRepository;

    @Override
    public Long save(String tagName) {
        if(exist(tagName)) throw new BaseException(BaseExceptionStatus.NOT_EXIST_TAG);
        Tag tag = new Tag(tagName);
        tagRepository.save(tag);
        return tag.getTag_id();
    }

    @Override
    public void delete(Long tag_id) {
        Tag tag = findById(tag_id);
        tagRepository.delete(tag);
    }

    @Override
    public Tag findById(Long tag_id) throws BaseException{
        Optional<Tag> tag = tagRepository.findById(tag_id);
        if(tag.isEmpty()) throw new BaseException(BaseExceptionStatus.NOT_EXIST_TAG);
        return tag.get();
    }

    @Override
    public Tag findByName(String tagName) {
        Tag tag = tagRepository.findByTagName(tagName);
        if(tag == null) throw new BaseException(BaseExceptionStatus.NOT_EXIST_TAG);
        return tag;
    }

    @Override
    public List<Tag> findAll() {
        List<Tag> tags = tagRepository.findAll();
        return tags;
    }

    @Override
    public boolean exist(String tagName) {
        Tag tag = tagRepository.findByTagName(tagName);
        if(tag == null) return false;
        return true;
    }

}
