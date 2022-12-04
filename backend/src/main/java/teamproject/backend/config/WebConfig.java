package teamproject.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Cors 설정
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .exposedHeaders("Set-Cookie")
                .exposedHeaders("Set-cookie")
                .exposedHeaders("SetCookie")
                .exposedHeaders("setcookie")
                .exposedHeaders("accessCookie")
                .exposedHeaders("refreshCookie")
                .exposedHeaders("set-cookie");
    }
}
