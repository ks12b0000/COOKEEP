package teamproject.backend.config.filter;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseExceptionStatus;
import teamproject.backend.response.BaseResponse;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static teamproject.backend.response.BaseExceptionStatus.DO_NOT_LOGIN_USER;

/**
 * 인증 예외처리 필터
 * 예외를 잡아 응답값 처리해줌
 */
@Slf4j
public class ExceptionCatchFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
        log.info("예외캐치필터 초기화");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (BaseException e){
//            e.printStackTrace();
            log.info("인증 예외처리: {}", e.getMessage());
            setBaseResponse((HttpServletResponse) response, DO_NOT_LOGIN_USER);
        }
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }

    // 응답 설정
    private void setBaseResponse(HttpServletResponse response, BaseExceptionStatus eStatus) throws IOException{
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "https://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, HEAD, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401 응답코드로 설정

        BaseResponse baseResponse = new BaseResponse(eStatus);
        String json = new Gson().toJson(baseResponse);
        response.getWriter().write(json);
    }
}
