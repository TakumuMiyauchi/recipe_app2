package io.github.tm.recipeApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//API疎通確認用
@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}