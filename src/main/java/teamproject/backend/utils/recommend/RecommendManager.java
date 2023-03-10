package teamproject.backend.utils.recommend;

import java.util.List;

/**
 * 해당 인터페이스는 객체 E를 추천하는 모든 RecommendService<E>을 관리하는 Manager 인터페이스이다.
 * 주된 목적은 다음과 같다.
 *
 * 1. 추천 중인 객체가 삭제되었을 경우, 이를 service에 알리고, 변경된 id를 받아 관리한다.
 * 2. 추천 중인 객체를 강제 업데이트할 수 있다.
 * 3. 그 외 추천 서비스 전체를 관리할 기능을 추가할 수 있다.
 *
 * @param <E> 추천 객체
 */
public interface RecommendManager<E> {
    /**
     * 추천 중인 모든 객체 E에 대한 id 목록을 리턴하는 메서드이다.
     * @return E에 대해 구현된 RecommendService<E>들이 추천 중인 id 전체 목록 리턴
     */
    List<Long> getIdList();

    /**
     * 객체 E가 삭제되어 더 이상 존재하면 안되는 경우 해당 id를 갖는 모든 service의 update를 진행한다.
     * @param id 삭제된 객체 E의 id
     * @return 업데이트 후 추가된 id의 목록
     */
    List<Long> update(Long id);

    /**
     * Manager가 관리하는 모든 Service를 updateAll 한다. 사용과 관리에 유의해야 한다.
     */
    void updateAll();
}
