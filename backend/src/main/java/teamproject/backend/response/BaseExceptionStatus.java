package teamproject.backend.response;

import lombok.Getter;

@Getter
public enum BaseExceptionStatus {

    SERVER_INTERNAL_ERROR(2002, "서버 내부적인 에러"),

    // 유저 관련 에러코드
    DUPLICATE_ID(3001, "중복된 아이디가 있습니다."),
    FAIL_ENCRYPT_PASSWORD(3002, "비밀번호 암호화에 실패했습니다."),
    LOGIN_USER_NOT_EXIST(3003, "아이디, 또는 비밀번호가 일치하지 않습니다."),

    PASSWORD_CHECK(3004, "비밀번호가 일치하지 않습니다."),

    //[4000 ~] Board 관련 에러코드// 생성 관련 에러코드
    SHORT_TITLE_LENGTH(4001, "글의 제목이 짧습니다."),

    SHORT_TEXT_LENGTH(4002, "글의 내용이 짧습니다."),

    //[4050 ~] 조회 관련 에러코드
    NOT_EXIST_BOARD(4050,"존재하지 않는 글입니다."),

    OVER_PAGE_NUMBER(4051, "페이지 번호 초과"),

    LESS_PAGE_NUMBER(4052, "페이지 번호 부족"),

    // 쿠키, 토큰, 인증 관련 에러코드
    JWT_TOKEN_EXPIRE(5002, "JWT 토큰 만료되었습니다."),
    JWT_TOKEN_INVALID(5003,"잘못된 JWT 토큰입니다.");
    private final int code;
    private final String message;

    private BaseExceptionStatus(int code, String msg){
        this.code = code;
        this.message = msg;
    }
}
