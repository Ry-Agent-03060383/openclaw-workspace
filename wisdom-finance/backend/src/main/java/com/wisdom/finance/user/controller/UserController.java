package com.wisdom.finance.user.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.entity.Farmer;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户控制器 - 用户管理和角色业务流程
 */
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 创建用户
     */
    @PostMapping("/create")
    public Result<User> createUser(@RequestBody User user) {
        try {
            User created = userService.createUser(user);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 创建农户用户
     */
    @PostMapping("/create/farmer")
    public Result<User> createFarmerUser(@RequestParam String username,
                                       @RequestParam String password,
                                       @RequestParam String realName,
                                       @RequestParam String phone,
                                       @RequestParam String email,
                                       @RequestBody Farmer farmer) {
        try {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setRealName(realName);
            user.setPhone(phone);
            user.setEmail(email);
            
            User created = userService.createFarmerUser(user, farmer);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 创建企业用户
     */
    @PostMapping("/create/enterprise")
    public Result<User> createEnterpriseUser(@RequestParam String username,
                                           @RequestParam String password,
                                           @RequestParam String realName,
                                           @RequestParam String phone,
                                           @RequestParam String email,
                                           @RequestBody Enterprise enterprise) {
        try {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setRealName(realName);
            user.setPhone(phone);
            user.setEmail(email);
            
            User created = userService.createEnterpriseUser(user, enterprise);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/{userId}")
    public Result<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
        try {
            User updated = userService.updateUser(userId, user);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新农户信息
     */
    @PutMapping("/farmer/{farmerId}")
    public Result<Farmer> updateFarmer(@PathVariable Long farmerId, @RequestBody Farmer farmer) {
        try {
            Farmer updated = userService.updateFarmer(farmerId, farmer);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新企业信息
     */
    @PutMapping("/enterprise/{enterpriseId}")
    public Result<Enterprise> updateEnterprise(@PathVariable Long enterpriseId, @RequestBody Enterprise enterprise) {
        try {
            Enterprise updated = userService.updateEnterprise(enterpriseId, enterprise);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取用户详情
     */
    @GetMapping("/{userId}")
    public Result<User> getUser(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        if (user == null) {
            return Result.error("用户不存在");
        }
        return Result.success(user);
    }

    /**
     * 获取农户详情
     */
    @GetMapping("/farmer/{farmerId}")
    public Result<Farmer> getFarmer(@PathVariable Long farmerId) {
        Farmer farmer = userService.getFarmer(farmerId);
        if (farmer == null) {
            return Result.error("农户不存在");
        }
        return Result.success(farmer);
    }

    /**
     * 根据用户ID获取农户信息
     */
    @GetMapping("/farmer/by-user/{userId}")
    public Result<Farmer> getFarmerByUserId(@PathVariable Long userId) {
        Farmer farmer = userService.getFarmerByUserId(userId);
        if (farmer == null) {
            return Result.error("农户信息不存在");
        }
        return Result.success(farmer);
    }

    /**
     * 获取企业详情
     */
    @GetMapping("/enterprise/{enterpriseId}")
    public Result<Enterprise> getEnterprise(@PathVariable Long enterpriseId) {
        Enterprise enterprise = userService.getEnterprise(enterpriseId);
        if (enterprise == null) {
            return Result.error("企业不存在");
        }
        return Result.success(enterprise);
    }

    /**
     * 根据用户ID获取企业信息
     */
    @GetMapping("/enterprise/by-user/{userId}")
    public Result<Enterprise> getEnterpriseByUserId(@PathVariable Long userId) {
        Enterprise enterprise = userService.getEnterpriseByUserId(userId);
        if (enterprise == null) {
            return Result.error("企业信息不存在");
        }
        return Result.success(enterprise);
    }

    /**
     * 获取用户列表
     */
    @GetMapping("/list")
    public Result<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return Result.success(users);
    }

    /**
     * 根据用户类型获取用户列表
     */
    @GetMapping("/list/by-type/{userType}")
    public Result<List<User>> getUsersByType(@PathVariable String userType) {
        try {
            User.UserType type = User.UserType.valueOf(userType.toUpperCase());
            List<User> users = userService.getUsersByType(type);
            return Result.success(users);
        } catch (IllegalArgumentException e) {
            return Result.error("无效的用户类型");
        }
    }

    /**
     * 获取农户列表
     */
    @GetMapping("/farmers")
    public Result<List<Farmer>> getFarmers() {
        List<Farmer> farmers = userService.getFarmers();
        return Result.success(farmers);
    }

    /**
     * 获取企业列表
     */
    @GetMapping("/enterprises")
    public Result<List<Enterprise>> getEnterprises() {
        List<Enterprise> enterprises = userService.getEnterprises();
        return Result.success(enterprises);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<User> login(@RequestParam String username, @RequestParam String password) {
        try {
            User user = userService.login(username, password);
            return Result.success(user);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }
}
