package teamproject.backend.imageFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.ImageFile;

import java.util.Date;
import java.util.List;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Long> {
    ImageFile findByUrl(String url);
    ImageFile findByFileName(String fileName);
    List<ImageFile> findByBoardIdIsNullAndCreateDateBefore(Date time);
    List<ImageFile> findByUserIdAndBoardIdOrBoardIdIsNull(@Param("userId") Long userId, @Param("boardId") Long boardId);
    List<ImageFile> findByBoardId(Long boardId);
}
