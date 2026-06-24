package com.wisdom.finance.security.dto;

import com.wisdom.finance.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String tokenType = "Bearer";
    private User user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.tokenType = "Bearer";
        this.user = user;
    }
}
