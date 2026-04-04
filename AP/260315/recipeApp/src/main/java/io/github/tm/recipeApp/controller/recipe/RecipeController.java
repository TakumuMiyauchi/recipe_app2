package io.github.tm.recipeApp.controller.recipe;

import io.github.tm.recipeApp.dto.recipe.RecipeDetailResponse;
import io.github.tm.recipeApp.dto.recipe.RecipeEditorRequest;
import io.github.tm.recipeApp.dto.recipe.RecipeListResponse;
import io.github.tm.recipeApp.dto.recipe.RecipeRegisterRequest;
import io.github.tm.recipeApp.security.LoginUser;
import io.github.tm.recipeApp.service.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<Page<RecipeListResponse>> getAllRecipes(
            @PageableDefault(size = 10, sort = "registeredAt") Pageable pageable) {

        Page<RecipeListResponse> recipes = recipeService.getAllRecipes(pageable);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<RecipeDetailResponse> getRecipeDetail(
            @PathVariable Long recipeId) {

        RecipeDetailResponse response = recipeService.getRecipeDetail(recipeId);
        return ResponseEntity.ok(response);

        }

    @PostMapping
    public ResponseEntity<String> recipeRegister(
            @RequestBody RecipeRegisterRequest request,
            @AuthenticationPrincipal LoginUser loginUser) {
        recipeService.recipeRegister(request,loginUser.getUserId());
        return ResponseEntity.ok("レシピが登録されました。");
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<String> recipeEditor(
            @PathVariable Long recipeId,
            @RequestBody RecipeEditorRequest request,
            @AuthenticationPrincipal LoginUser loginUser) {
        recipeService.recipeEditor(recipeId, request, loginUser.getUserId());
        return ResponseEntity.ok("レシピが編集されました");
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<String> recipeDelete(
            @PathVariable Long recipeId,
            @AuthenticationPrincipal LoginUser loginUser) {
        recipeService.recipeDelete(recipeId, loginUser.getUserId());
        return  ResponseEntity.ok("レシピが削除されました。");
    }

}