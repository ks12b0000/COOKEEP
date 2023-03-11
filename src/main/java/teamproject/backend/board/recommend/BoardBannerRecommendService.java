package teamproject.backend.board.recommend;

import teamproject.backend.board.dto.BoardResponseInBannerFormat;
import teamproject.backend.domain.Board;
import teamproject.backend.utils.recommend.RecommendService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public abstract class BoardBannerRecommendService implements RecommendService<Board, BoardResponseInBannerFormat> {
    Map<Long, BoardResponseInBannerFormat> recommendBanners;

    public BoardBannerRecommendService() {
        recommendBanners = new HashMap<>();
    }

    @Override
    public List<BoardResponseInBannerFormat> getRecommend() {
        return recommendBanners.values().stream().collect(Collectors.toList());
    }

    @Override
    public List<Long> getIdList() {
        return recommendBanners.keySet().stream().collect(Collectors.toList());
    }

    protected void insert(Long id, Optional<Board> board) {;
        recommendBanners.put(id, new BoardResponseInBannerFormat(board.get()));
    }

    protected void delete(Long id){
        recommendBanners.remove(id);
    }

    public abstract Long update(Long id);
    public abstract List<Long> updateAll();
}
