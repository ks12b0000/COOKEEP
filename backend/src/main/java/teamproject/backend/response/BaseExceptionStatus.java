package teamproject.backend.response;

import lombok.Getter;

@Getter
public enum BaseExceptionStatus {

    SERVER_INTERNAL_ERROR(2002, "서버 내부적인 에러"),

    // 유저 관련 에러코드
    DUPLICATE_ID(3001, "중복된 아이디가 있습니다."),
    FAIL_ENCRYPT_PASSWORD(3002, "비밀번호 암호화에 실패했습니다."),
    LOGIN_USER_NOT_EXIST(3003, "아이디, 또는 비밀번호가 일치하지 않습니다."),
    USER_NOT_EXIST(3005, "존재하지 않는 유저입니다."),
    DUPLICATE_EMAIL(3001, "중복된 이메일이 있습니다."),
    KAKAO_GET_TOKEN_FAIL(3101, "예상치 못한 이유로 카카오 토큰 받기에 실패했습니다"),
    KAKAO_GET_USER_INFO_FAIL(3102, "예상치 못한 이유로 카카오 사용자 정보 가져오기에 실패했습니다"),
    NAVER_GET_TOKEN_FAIL(3103, "예상치 못한 이유로 네이버 토큰 받기에 실패했습니다"),
    NAVER_GET_USER_INFO_FAIL(3104, "예상치 못한 이유로 네이버 사용자 정보 가져오기에 실패했습니다"),
    GOOGLE_GET_TOKEN_FAIL(3105, "예상치 못한 이유로 구글 토큰 받기에 실패했습니다"),
    GOOGLE_GET_USER_INFO_FAIL(3106, "예상치 못한 이유로 구글 사용자 정보 가져오기에 실패했습니다"),

    //[4000 ~] Board 관련 에러코드// 생성 관련 에러코드
    SHORT_TITLE_LENGTH(4001, "글의 제목이 짧습니다."),

    SHORT_TEXT_LENGTH(4002, "글의 내용이 짧습니다."),

    NOT_LIKE_BOARD(4003, "좋아요 기록을 찾을 수 없습니다."),

    //[4050 ~] 조회 관련 에러코드
    NOT_EXIST_BOARD(4050,"존재하지 않는 글입니다."),

    OVER_PAGE_NUMBER(4051, "페이지 번호 초과"),

    LESS_PAGE_NUMBER(4052, "페이지 번호 부족"),

    //[4070 ~] 이미지 관련 에러코드
    NOT_EXIST_IMAGE_URL(4070, "존재하지 않는 이미지 url"),

    //[4090 ~] 카테고리 관련 에러코드
    NOT_EXIST_CATEGORY(4090, "존재하지 않는 카테고리입니다."),

    // 쿠키, 토큰, 인증 관련 에러코드
    JWT_TOKEN_EXPIRE(5002, "JWT 토큰 만료되었습니다."),
    JWT_TOKEN_INVALID(5003,"잘못된 JWT 토큰입니다."),
    UNAUTHORIZED_USER_ACCESS(5004, "인증되지 않은 유저의 접근입니다."),
    DO_NOT_LOGIN_USER(5005, "로그인이 필요한 요청입니다."),

    // 메일 인증 에러코드
    EMAIL_ERROR(6001, "이메일 전송에 실패했습니다.");

    private final int code;
    private final String message;

    private BaseExceptionStatus(int code, String msg){
        this.code = code;
        this.message = msg;
    }
}
