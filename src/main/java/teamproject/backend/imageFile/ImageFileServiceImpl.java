package teamproject.backend.imageFile;

import lombok.RequiredArgsConstructor;
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
}
