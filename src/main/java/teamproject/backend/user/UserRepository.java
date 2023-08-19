package teamproject.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.User;

import javax.persistence.LockModeType;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
    User findByEmail(String email);
    User findByUsernameAndEmail(String username, String email);
    User findByNickname(String nickName);
    boolean existsUserByNickname(String nickname);
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query(value = "select u from User u where u.id =:id")
    Optional<User> findByIdForUpdate(@Param("id") Long id);
}
