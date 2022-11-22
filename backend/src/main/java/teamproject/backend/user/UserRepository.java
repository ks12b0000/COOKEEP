package teamproject.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
}
