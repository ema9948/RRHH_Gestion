package com.rrhh.recibo.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig {


    @Value("${frontUri}")
    private String uri;

    @Bean
    public WebMvcConfigurer corsConfigure() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/api/v1/**")
                        .allowedOrigins(uri)
                        .allowedMethods("*");

                WebMvcConfigurer.super.addCorsMappings(registry);

            }
        };
    }


}
