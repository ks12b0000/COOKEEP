package teamproject.backend.board.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import teamproject.backend.board.BoardRepository;
import teamproject.backend.domain.Board;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Qualifier("weeklyBoard")
public class WeeklyBoardRecommendService extends BoardBannerRecommendService{

    private final BoardRepository boardRepository;
    private final int size = 4;

    @Autowired
    public WeeklyBoardRecommendService(BoardRepository boardRepository) {
        super();
        this.boardRepository = boardRepository;
    }

    @Override
    public Long update(Long id) {
        Long randomId = getRandomId();
        delete(id);
        if(randomId != null) insert(id, boardRepository.findById(randomId));
        return randomId;
    }

    @Override
    public List<Long> updateAll() {
        List<Long> randomIdList = getRandomIdList();

        for(Long id : randomIdList){
            Optional<Board> board = boardRepository.findById(id);
            insert(id, board);
        }

        return randomIdList;
    }

    private List<Long> getRandomIdList(){
        List<Long> allId = boardRepository.findBoardIdAll();
        int max = allId.size() - 1;

        Set<Long> randomId = new HashSet<>();
        Random random = new Random();

        if(allId.size() < this.size) return allId;
        else{
            while (randomId.size() < this.size){
                int randomIndex = random.nextInt(0, max);
                randomId.add(allId.get(randomIndex));
            }
        }

        return randomId.stream().collect(Collectors.toList());
    }

    private Long getRandomId(){
        List<Long> allIdList = boardRepository.findBoardIdAll();
        Random random = new Random();

        if(allIdList.size() < this.size + 1) return null;

        Long randomId = allIdList.get(random.nextInt(0,allIdList.size() - 1));
        while (!recommendBanners.containsKey(randomId)){
            randomId = allIdList.get(random.nextInt(0,allIdList.size() - 1));
        }

        return randomId;
    }
}
