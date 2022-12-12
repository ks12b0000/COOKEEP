package teamproject.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import teamproject.backend.config.filter.AuthorizationFilter;
import teamproject.backend.config.filter.ExceptionCatchFilter;
import teamproject.backend.utils.CookieService;
import teamproject.backend.utils.JwtService;

@Configuration
@RequiredArgsConstructor
public class FilterConfiguration implements WebMvcConfigurer {

    private final JwtService jwtService;
    private final CookieService cookieService;

    @Bean
    public FilterRegistrationBean<AuthorizationFilter> authorizationFilterRegistrationBean(){
        FilterRegistrationBean<AuthorizationFilter> registrationBean = new FilterRegistrationBean<>();
        AuthorizationFilter authorizationFilter = new AuthorizationFilter(jwtService, cookieService);
        registrationBean.setFilter(authorizationFilter);
        registrationBean.addUrlPatterns("/auth/user/login*");
        registrationBean.setOrder(2);

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<ExceptionCatchFilter> exceptionCatchFilterRegistrationBean(){
        FilterRegistrationBean<ExceptionCatchFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ExceptionCatchFilter());
        registrationBean.addUrlPatterns("/auth/user/login*");
        registrationBean.setOrder(1);

        return registrationBean;
    }
}
