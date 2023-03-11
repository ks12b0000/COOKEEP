package teamproject.backend.mainPage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.*;

import java.util.List;
import java.util.Optional;

@Repository
public interface SearchRepository extends JpaRepository<SearchKeyword, String> {

    Optional<SearchKeyword> findByKeyword(String keyword);

    List<SearchKeyword> findTop10ByOrderBySearchedDesc();

    List<SearchKeyword> findByKeywordContaining(@Param("keyword") String keyword);
}
