package teamproject.backend.response;

import lombok.Getter;

@Getter
public enum BaseExceptionStatus {

    SERVER_INTERNAL_ERROR(2002, "서버 내부적인 에러"),

    // 유저 관련 에러코드
    DUPLICATE_ID(3001, "중복된 아이디가 있습니다."),
    FAIL_ENCRYPT_PASSWORD(3002, "비밀번호 암호화에 실패했습니다."),
    LOGIN_USER_NOT_EXIST(3003, "아이디, 또는 비밀번호가 일치하지 않습니다."),

    // 쿠키, 토큰, 인증 관련 에러코드
    JWT_TOKEN_EXPIRE(5002, "JWT 토큰 만료되었습니다."),
    JWT_TOKEN_INVALID(5003,"잘못된 JWT 토큰입니다."),
    UNAUTHORIZED_USER_ACCESS(5004, "인증되지 않은 유저의 접근입니다."),
    DO_NOT_LOGIN_USER(5005, "로그인이 필요한 요청입니다.");

    private final int code;
    private final String message;

    private BaseExceptionStatus(int code, String msg){
        this.code = code;
        this.message = msg;
    }
}
