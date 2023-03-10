package teamproject.backend.board.recommend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
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
@Qualifier("boardRecommendManager")
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
    @Transactional
    public void update(Long deleteId) {
        if(store.containsKey(deleteId)){
            List<RecommendService<Board, ?>> serviceList = store.get(deleteId);

            for(RecommendService<Board, ?> service : serviceList){
                Long updateId = service.update(deleteId);
                deleteStore(deleteId, service);
                insertStore(updateId, service);
            }
        }
    }

    @Override
    @Scheduled(cron = "0 0 12 ? * FRI")
    @Transactional
    public void updateAll() {
        store.clear();

        for(RecommendService<Board, ?> service : this.serviceList){
            List<Long> commentIdList = service.updateAll();
            insertStore(commentIdList, service);
        }
    }

    @Override
    public boolean isContains(Long id) {
        return store.containsKey(id);
    }


    private void insertStore(List<Long> idList, RecommendService<Board, ?> service){
        for(Long id : idList){
            insertStore(id, service);
        }
    }

    private void insertStore(Long id, RecommendService<Board, ?> service){
        if(store.containsKey(id)){
            store.get(id).add(service);
        }
        else{
            List<RecommendService<Board, ?>> list = new ArrayList<>();
            list.add(service);
            store.put(id, list);
        }
    }

    private void deleteStore(Long id, RecommendService<Board, ?> targetService){
        if(store.containsKey(id)){
            List<RecommendService<Board, ?>> list = store.get(id);
            for(int i = 0 ; i < list.size(); i++){
                if (list.get(i).equals(targetService)){
                    list.remove(i);
                    return;
                }
            }
        }
    }
}
