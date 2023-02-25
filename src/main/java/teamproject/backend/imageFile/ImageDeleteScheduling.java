package teamproject.backend.imageFile;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.ImageFile;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ImageDeleteScheduling {
    private final ImageFileRepository imageFileRepository;
    private final ImageFileService imageFileService;

    //@Scheduled(cron = "0 0/1 * 1/1 * ?")// 매 3분마다 - 테스트 시 사용
    @Transactional
    @Scheduled(cron = "0 0 2 1/1 * ?") // 매일 새벽 2시
    public void deleteUnusedImages(){
        Date ago6Hours = getAgoHours(6);
        //생성일로부터 6시간 이상 경과했으면서 동시에 board_id가 null인 이미지를 모두 찾음
        List<ImageFile> unmanagedImages = imageFileRepository.findByBoardIdIsNullAndCreateDateBefore(ago6Hours);

        for(ImageFile imageFile : unmanagedImages){
            //해당 이미지를 만든 아이디가 작성한 모든 글을 찾아 해당 이미지가 사용되었는지 확인
            Board usedBoard = imageFileService.getUsedBoard(imageFile);

            if(usedBoard == null){
                //이미지가 사용 중이지 않다면, 이미지를 삭제한다.(DB, S3)
                imageFileService.delete(imageFile.getFileName());
            }
            else{
                //이미지가 사용 중이라면 board_id를 넣어준다.
                imageFile.setBoardId(usedBoard.getBoardId());
            }
        }
    }

    private Date getAgoHours(int hour){
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.HOUR_OF_DAY, (-1) * hour);
        return now;
    }
}
