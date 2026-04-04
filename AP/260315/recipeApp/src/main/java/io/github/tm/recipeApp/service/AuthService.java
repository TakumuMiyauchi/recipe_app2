package io.github.tm.recipeApp.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.github.tm.recipeApp.entity.User;
import io.github.tm.recipeApp.repository.UserRepository;
import io.github.tm.recipeApp.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

	// メールアドレスを元に、ログイン処理
    public String login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("メールアドレスまたはパスワードが不正です"));

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new RuntimeException("メールアドレスまたはパスワードが不正です");
        }

        return jwtUtil.generateToken(user.getUserId(), user.getEmail());
    }
}
