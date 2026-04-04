package io.github.tm.recipeApp.controller.user;

import io.github.tm.recipeApp.dto.auth.LoginRequest;
import io.github.tm.recipeApp.dto.auth.LoginResponse;
import io.github.tm.recipeApp.dto.user.RegisterRequest;
import io.github.tm.recipeApp.repository.UserRepository;
import io.github.tm.recipeApp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService ) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("ユーザー登録完了");
    }
}