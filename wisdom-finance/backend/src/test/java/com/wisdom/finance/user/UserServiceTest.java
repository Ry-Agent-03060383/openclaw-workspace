package com.wisdom.finance.user;

import com.wisdom.finance.user.service.UserService;
import com.wisdom.finance.user.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockBean;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @MockBean
    private com.wisdom.finance.user.mapper.UserRepository userRepository;

    @MockBean
    private com.wisdom.finance.user.mapper.FarmerRepository farmerRepository;

    @MockBean
    private com.wisdom.finance.user.mapper.EnterpriseRepository enterpriseRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    void testCreateUser_Success() {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("pass123");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("pass123")).thenReturn("hashedpwd");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User created = userService.createUser(user);
        assertNotNull(created);
        assertEquals("testuser", created.getUsername());
        assertEquals("hashedpwd", created.getPassword());
    }
}
