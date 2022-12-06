package teamproject.backend.imageFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.ImageFile;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Long> {

}
