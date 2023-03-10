package teamproject.backend.board.recommend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import teamproject.backend.domain.Board;
import teamproject.backend.utils.recommend.RecommendManager;
import teamproject.backend.utils.recommend.RecommendService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class BoardRecommendManager implements RecommendManager<Board> {
    Map<Long, List<RecommendService<Board, ?>>> store;
    List<RecommendService<Board, ?>> serviceList;

    @Autowired
    public BoardRecommendManager(List<RecommendService<Board, ?>> list) {
        store = new HashMap<>();
        serviceList = list;
        updateAll();
    }

    @Override
    public List<Long> getIdList() {
        return store.keySet().stream().collect(Collectors.toList());
    }

    @Override
    public List<Long> update(Long id) {
        List<Long> updateList = new ArrayList<>();

        if(store.containsKey(id)){
            List<RecommendService<Board, ?>> serviceList = store.get(id);

            for(RecommendService<Board, ?> service : serviceList){
                Long updateId = service.update(id);
                updateList.add(updateId);
            }
        }

        return updateList;
    }

    @Override
    public void updateAll() {
        for(RecommendService<Board, ?> service : this.serviceList){
            List<Long> commentIdList = service.getIdList();
            insertStore(commentIdList, service);
        }
    }

    @Override
    public boolean isContains(Long id) {
        return store.containsKey(id);
    }

    private void insertStore(List<Long> idList, RecommendService<Board, ?> service){
        for(Long id : idList){
            if(store.containsKey(id)){
                store.get(id).add(service);
            }
            else{
                List<RecommendService<Board, ?>> list = new ArrayList<>();
                list.add(service);
                store.put(id, list);
            }
        }
    }
}
