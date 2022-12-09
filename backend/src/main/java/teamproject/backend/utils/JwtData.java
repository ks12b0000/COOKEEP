package teamproject.backend.utils;

import java.time.Duration;

public class JwtData {

    public static String JWT_SECRET_KEY = "fc12f421cdc36a7bdb32e900c9354e29111b6431833eaf157acba38ced8478dc11ec7f343643af1d6f012e057f3a0e2ec76ebb1ecea54ab4edd2d4ab501c45dbc8";

    // 밀리초 = 1/1000, 30분 = 1800초
    // Duration.ofMinutes(30).toMillis() = 1,800,000 = 30분을 밀리초로 환산한 것
    public static long ACCESS_TOKEN_EXPIRE_MILLIS = Duration.ofHours(1).toMillis();
    public static long REFRESH_TOKEN_EXPIRE_MILLIS = Duration.ofDays(30).toMillis();
    public static final int REFRESH_COOKIE_EXPIRE_SECOND = (int) Duration.ofDays(30).toMillis();
    public static final int ACCESS_COOKIE_EXPIRE_SECOND = (int) Duration.ofHours(1).toMillis();
}
