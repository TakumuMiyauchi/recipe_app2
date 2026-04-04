package io.github.tm.recipeApp.controller.auth;

import io.github.tm.recipeApp.security.LoginUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import io.github.tm.recipeApp.service.AuthService;
import io.github.tm.recipeApp.dto.auth.LoginRequest;
import io.github.tm.recipeApp.dto.auth.LoginResponse;
import io.github.tm.recipeApp.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

	// アドレスとPWを元に、tokenを含めてレスポンスを返す。
    @PostMapping("/login")
        public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
            String token = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(new LoginResponse(token));
        }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal LoginUser loginUser) {
        return ResponseEntity.ok(loginUser);
    }


    @PostMapping("/logout")
        public String logout() {
            return "logout";
        }
    }
