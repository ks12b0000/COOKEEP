package teamproject.backend.imageFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import teamproject.backend.board.BoardRepository;
import teamproject.backend.domain.Board;
import teamproject.backend.domain.ImageFile;
import teamproject.backend.domain.User;
import teamproject.backend.utils.S3.S3DAO;
import teamproject.backend.imageFile.dto.ImageFileResponse;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.user.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageFileServiceImpl implements ImageFileService{
    private final S3DAO s3DAO;
    private final ImageFileRepository imageFileRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Override
    @Transactional
    public ImageFileResponse save(MultipartFile multipartFile, Long userId) throws IOException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new BaseException(BaseExceptionStatus.UNAUTHORIZED_USER_ACCESS);

        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
        s3DAO.upload(s3FileName, multipartFile);
        String url = s3DAO.getURL(s3FileName);

        ImageFile imageFile = new ImageFile(s3FileName, url, user.get());
        imageFileRepository.save(imageFile);

        return new ImageFileResponse(true, s3FileName, url);
    }

    @Override
    @Transactional
    public void delete(String fileName) {
        s3DAO.delete(fileName);

        ImageFile imageFile = imageFileRepository.findByFileName(fileName);
        imageFileRepository.delete(imageFile);
    }

    @Override
    public Board getUsedBoard(ImageFile imageFile) {
        User user = imageFile.getUser();
        Board usedImage = null;

        List<Board> boards = boardRepository.findByUser(user);
        for(Board board : boards){
            if(board.getThumbnail().equals(imageFile.getUrl())){
                usedImage = board;
                break;
            }
            if(board.getText().contains(imageFile.getUrl())){
                usedImage = board;
                break;
            }
        }

        return usedImage;
    }

    @Transactional
    @Override
    public void deleteSaveImages(Long userId, Long boardId) {
        List<ImageFile> unmanagedImages = imageFileRepository.findByUserIdAndBoardIdOrBoardIdIsNull(userId, boardId);

        for(ImageFile imageFile : unmanagedImages){
            //해당 이미지를 만든 아이디가 작성한 모든 글을 찾아 해당 이미지가 사용되었는지 확인
            Board usedBoard = getUsedBoard(imageFile);

            if(usedBoard == null){
                //이미지가 사용 중이지 않다면, 이미지를 삭제한다.(DB, S3)
                delete(imageFile.getFileName());
            }
            else{
                //이미지가 사용 중이라면 board_id를 넣어준다.
                imageFile.setBoardId(usedBoard.getBoardId());
            }
        }
    }
}
