package io.github.tm.recipeApp.dto.recipe;

import lombok.Data;
import java.util.List;

@Data
public class RecipeRegisterRequest {
    private String recipeName;
    private String recipeUrl;
    private String imagePath;
    private Integer recipeCount;
    private String note;
    private List<Long> categoryIds;

}
