package teamproject.backend.mypage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.User;

import javax.persistence.LockModeType;
import java.util.Optional;

@Repository
public interface MyPageRepository extends JpaRepository<User, Long> {

    User findByPassword(String password);

    User findByUsername(String username);

    User findByEmail(String email);

    boolean existsUserByNickname(String nickname);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query(value = "select u from User u where u.id =:id")
    Optional<User> findByIdForUpdate(Long id);
}
