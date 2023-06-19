package teamproject.backend.config;

import com.fasterxml.classmate.TypeResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import teamproject.backend.WebController;
import teamproject.backend.response.BaseException;
import teamproject.backend.response.BaseResponse;
import teamproject.backend.response.ExceptionResponseAdvice;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api(TypeResolver typeResolver) {
        return new Docket(DocumentationType.OAS_30)
                .additionalModels(typeResolver.resolve(BaseResponse.class))
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo())
                .ignoredParameterTypes(WebController.class);
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("COOKEEP API")
                .description("COOKEEP BackEnd API 문서")
                .version("1.0")
                .build();
    }
}
