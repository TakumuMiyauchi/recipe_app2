package io.github.tm.recipeApp.security;

import lombok.Data;

@Data
public class LoginUser {

    private final Long userId;
    private final String email;

    public LoginUser(Long userId, String email) {
        this.userId = userId;
        this.email = email;
    }

}
