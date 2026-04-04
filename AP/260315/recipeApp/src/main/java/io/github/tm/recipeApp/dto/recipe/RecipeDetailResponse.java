package io.github.tm.recipeApp.dto.recipe;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RecipeDetailResponse {
    private Long recipeId;
    private String recipeName;
    private String recipeUrl;
    private String imagePath;
    private LocalDateTime registeredAt;
    private Integer recipeCount;
    private String note;
    private List<CategoryResponse> categories;

    public RecipeDetailResponse(
            Long recipeId,
            String recipeName,
            String recipeUrl,
            String imagePath,
            LocalDateTime registeredAt,
            Integer recipeCount,
            String note,
            List<CategoryResponse> categories
    ) {
        this.recipeId = recipeId;
        this.recipeName = recipeName;
        this.recipeUrl = recipeUrl;
        this.imagePath = imagePath;
        this.registeredAt = registeredAt;
        this.recipeCount = recipeCount;
        this.note = note;
        this.categories = categories;
    }
}
