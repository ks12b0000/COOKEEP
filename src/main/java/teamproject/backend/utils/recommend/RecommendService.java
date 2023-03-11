package teamproject.backend.utils.recommend;

import java.util.List;

/**
 * 객체 E를 특정 로직을 사용하여 추천하는 서비스이다.
 */
public interface RecommendService<E, T> {
    /**
     * 추천된 E객체를 T타입으로 리턴하는 메서드이다.
     * @return 추천된 객체 리스트
     */
    List<T> getRecommend();

    /**
     * 추천된 객체의 id 목록을 리턴하는 메서드이다.
     * @return 추천된 객체 id 리스트
     */
    List<Long> getIdList();

    /**
     * 특정 이유(예 : 객체 삭제)로 객체 추천을 변경할 경우 사옹되는 메서드이다. 기존 id와 다른 새로운 id의 객체를 특정 로직에 따라 추천하고 이를 반환한다.
     * @param id 변경되어야 할 객체 id
     * @return 변경 후 추가된 객체 id
     */
    Long update(Long id);

    /**
     * 특정 이유로 객체 추천 전체를 교체할 경우 사용되는 메서드이다.
     */
    List<Long> updateAll();
}
