package teamproject.backend.mypage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teamproject.backend.domain.User;

@Repository
public interface MyPageRepository extends JpaRepository<User, Long> {

    User findByPassword(String password);

    User findByUsername(String username);

    User findByEmail(String email);
}
