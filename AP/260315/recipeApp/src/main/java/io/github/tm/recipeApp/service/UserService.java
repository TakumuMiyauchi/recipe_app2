package io.github.tm.recipeApp.service;

import io.github.tm.recipeApp.dto.user.RegisterRequest;
import io.github.tm.recipeApp.entity.User;
import io.github.tm.recipeApp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

	// PWをハッシュ化してDBにユーザー情報を登録する
    public void register(RegisterRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(hashedPassword);

        userRepository.save(user);
    }
}
