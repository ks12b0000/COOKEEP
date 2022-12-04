package teamproject.backend.user;

import teamproject.backend.user.dto.SocialUserInfo;

public interface SocialUserService {

    public SocialUserInfo joinBySocial(String username, String email);

    public Long checkUserHasJoin(String username);
}
