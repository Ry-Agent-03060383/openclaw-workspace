package com.wisdom.finance.user.controller;

import com.wisdom.finance.common.controller.PageResult;
import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.entity.Farmer;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public Result<User> createUser(@RequestBody User user) {
        try {
            User created = userService.createUser(user);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

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

    @PutMapping("/{userId}")
    public Result<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
        try {
            User updated = userService.updateUser(userId, user);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/{userId}/status")
    public Result<User> toggleStatus(@PathVariable Long userId) {
        try {
            User user = userService.toggleUserStatus(userId);
            return Result.success(user);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}")
    public Result<Void> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return Result.success(null);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/farmer/{farmerId}")
    public Result<Farmer> updateFarmer(@PathVariable Long farmerId, @RequestBody Farmer farmer) {
        try {
            Farmer updated = userService.updateFarmer(farmerId, farmer);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/enterprise/{enterpriseId}")
    public Result<Enterprise> updateEnterprise(@PathVariable Long enterpriseId, @RequestBody Enterprise enterprise) {
        try {
            Enterprise updated = userService.updateEnterprise(enterpriseId, enterprise);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public Result<User> getUser(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        if (user == null) {
            return Result.error("用户不存在");
        }
        return Result.success(user);
    }

    @GetMapping("/farmer/{farmerId}")
    public Result<Farmer> getFarmer(@PathVariable Long farmerId) {
        Farmer farmer = userService.getFarmer(farmerId);
        if (farmer == null) {
            return Result.error("农户不存在");
        }
        return Result.success(farmer);
    }

    @GetMapping("/farmer/by-user/{userId}")
    public Result<Farmer> getFarmerByUserId(@PathVariable Long userId) {
        Farmer farmer = userService.getFarmerByUserId(userId);
        if (farmer == null) {
            return Result.error("农户信息不存在");
        }
        return Result.success(farmer);
    }

    @GetMapping("/enterprise/{enterpriseId}")
    public Result<Enterprise> getEnterprise(@PathVariable Long enterpriseId) {
        Enterprise enterprise = userService.getEnterprise(enterpriseId);
        if (enterprise == null) {
            return Result.error("企业不存在");
        }
        return Result.success(enterprise);
    }

    @GetMapping("/enterprise/by-user/{userId}")
    public Result<Enterprise> getEnterpriseByUserId(@PathVariable Long userId) {
        Enterprise enterprise = userService.getEnterpriseByUserId(userId);
        if (enterprise == null) {
            return Result.error("企业信息不存在");
        }
        return Result.success(enterprise);
    }

    @GetMapping("/list")
    public Result<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return Result.success(users);
    }

    @GetMapping("/page")
    public Result<PageResult<User>> pageUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String userType,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize) {
        PageResult<User> page = userService.searchUsers(keyword, userType, status, pageNum, pageSize);
        return Result.success(page);
    }

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

    @GetMapping("/farmers")
    public Result<List<Farmer>> getFarmers() {
        List<Farmer> farmers = userService.getFarmers();
        return Result.success(farmers);
    }

    @GetMapping("/enterprises")
    public Result<List<Enterprise>> getEnterprises() {
        List<Enterprise> enterprises = userService.getEnterprises();
        return Result.success(enterprises);
    }

    @PostMapping("/register")
    public Result<User> register(@RequestBody User user) {
        try {
            User created = userService.registerUser(user);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }
}
