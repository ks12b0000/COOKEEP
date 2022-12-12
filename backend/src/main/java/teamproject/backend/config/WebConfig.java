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
                .allowedOriginPatterns("https://localhost:3000")
                .exposedHeaders("accessToken","refreshToken" ,"Set-Cookie")
                .allowedMethods("POST", "GET")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
