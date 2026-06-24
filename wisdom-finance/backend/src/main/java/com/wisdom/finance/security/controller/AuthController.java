package com.wisdom.finance.security.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.security.dto.LoginRequest;
import com.wisdom.finance.security.dto.LoginResponse;
import com.wisdom.finance.security.dto.RegisterRequest;
import com.wisdom.finance.security.jwt.JwtTokenProvider;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getUsername(), request.getPassword());
            String token = jwtTokenProvider.generateToken(user.getUsername(), user.getUserType().name());
            return Result.success(new LoginResponse(token, user));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/register")
    public Result<User> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            user.setRealName(request.getRealName());
            user.setPhone(request.getPhone());
            user.setEmail(request.getEmail());
            User created = userService.registerUser(user);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }
}
