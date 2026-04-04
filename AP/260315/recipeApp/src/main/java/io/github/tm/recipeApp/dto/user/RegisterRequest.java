package io.github.tm.recipeApp.dto.user;

import lombok.Data;

@Data
public class RegisterRequest {
	private String userName;
	private String email;
    private String password;
}
