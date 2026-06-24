package com.wisdom.finance.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("智慧金服系统 API")
                        .version("1.0.0")
                        .description("焦作市智慧金融服务平台 - 中小企业融资服务系统")
                        .contact(new Contact()
                                .name("智慧金服团队")
                                .email("support@wisdom-finance.com")));
    }
}
