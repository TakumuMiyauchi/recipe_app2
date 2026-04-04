package io.github.tm.recipeApp.service;

import io.github.tm.recipeApp.dto.recipe.*;
import io.github.tm.recipeApp.entity.Category;
import io.github.tm.recipeApp.entity.Recipe;
import io.github.tm.recipeApp.entity.User;
import io.github.tm.recipeApp.repository.CategoryRepository;
import io.github.tm.recipeApp.repository.RecipeRepository;
import io.github.tm.recipeApp.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecipeService {

private final RecipeRepository recipeRepository;
private final CategoryRepository categoryRepository;
private final UserRepository userRepository;

    public RecipeService(RecipeRepository recipeRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

//    レシピ一覧表示（全ユーザー・ページネーション）
    @Transactional(readOnly = true)
    public Page<RecipeListResponse> getAllRecipes(Pageable pageable) {
        Page<Recipe> recipePage = recipeRepository.findAllByOrderByRegisteredAtDesc(pageable);

        List<Long> userIds = recipePage.getContent().stream()
                .map(Recipe::getUserId)
                .distinct()
                .toList();

        Map<Long, String> userNameMap = userRepository.findAllByUserIdIn(userIds).stream()
                .collect(Collectors.toMap(User::getUserId, User::getUserName));

        return recipePage.map(recipe -> new RecipeListResponse(
                recipe.getRecipeId(),
                recipe.getRecipeName(),
                recipe.getRecipeUrl(),
                recipe.getImagePath(),
                recipe.getRegisteredAt(),
                recipe.getRecipeCount(),
                userNameMap.getOrDefault(recipe.getUserId(), "不明"),
                recipe.getCategories().stream()
                        .map(category -> new CategoryResponse(
                                category.getCategoryId(),
                                category.getCategoryName(),
                                category.getThumbnailPath()
                        ))
                        .toList()
        ));
    }

//レシピ詳細表示
@Transactional(readOnly = true)
public RecipeDetailResponse getRecipeDetail(Long recipeId) {
        Recipe recipeDetail = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("レシピが見つかりません"));

        return new RecipeDetailResponse(
                recipeDetail.getRecipeId(),
                recipeDetail.getRecipeName(),
                recipeDetail.getRecipeUrl(),
                recipeDetail.getImagePath(),
                recipeDetail.getRegisteredAt(),
                recipeDetail.getRecipeCount(),
                recipeDetail.getNote(),
                recipeDetail.getCategories().stream()
                        .map(category -> new CategoryResponse(
                                category.getCategoryId(),
                                category.getCategoryName(),
                                category.getThumbnailPath()
                        ))
                        .toList()
        );

}

//レシピ登録
@Transactional
    public void recipeRegister(RecipeRegisterRequest request, Long userId) {
        Recipe recipe = new Recipe();

        recipe.setUserId(userId);
        recipe.setRecipeName(request.getRecipeName());
        recipe.setRecipeUrl(request.getRecipeUrl());
        recipe.setImagePath(
//        FEで画像を登録しなかった場合、明示的にNULLにする
                request.getImagePath() == null || request.getImagePath().isBlank()
                        ? null
                        : request.getImagePath()
        );
        recipe.setRecipeCount(0);
        recipe.setNote(request.getNote());

//      カテゴリは必ず一つは選択する必要がある。
        if (request.getCategoryIds() == null || request.getCategoryIds().isEmpty()) {
            throw new IllegalArgumentException("カテゴリは1つ以上選択してください。");
        }
//      重複チェック
        List<Long> categoryIds = request.getCategoryIds().stream()
                .distinct()
                .toList();

//      カテゴリーIDリストを基に、DBからカテゴリーエンティティをリストで取得
        List<Category> categories = categoryRepository.findAllById(categoryIds);
//      存在しないカテゴリーIDがリクエストされた場合
        if (categories.size() != categoryIds.size()) {
            throw new IllegalArgumentException("存在しないカテゴリIDが含まれています。");
        }
//      レシピで結合した中間テーブルにセット
        recipe.setCategories(categories);

        recipeRepository.save(recipe);

    }


//レシピ編集機能(更新)
@Transactional
public void recipeEditor (Long recipeId, RecipeEditorRequest request, Long userId) {
    Recipe recipe = recipeRepository.findByRecipeIdAndUserId(recipeId, userId)
            .orElseThrow(() -> new IllegalArgumentException("対象のレシピが存在しません。"));

    recipe.setRecipeName(request.getRecipeName());
    recipe.setRecipeUrl(request.getRecipeUrl());
    recipe.setImagePath(
//        FEで画像を登録しなかった場合、明示的にNULLにする
            request.getImagePath() == null || request.getImagePath().isBlank()
                    ? "/images/recipes/default.png"
                    : request.getImagePath()
    );

    recipe.setRecipeCount(request.getRecipeCount());
    recipe.setNote(request.getNote());

//    カテゴリは必ず一つは選択する必要がある。
    if (request.getCategoryIds() == null || request.getCategoryIds().isEmpty()) {
        throw new IllegalArgumentException("カテゴリは1つ以上選択してください。");
    }
//    重複チェック
    List<Long> categoryIds = request.getCategoryIds().stream()
            .distinct()
            .toList();

//    カテゴリーIDリストを基に、DBからカテゴリーエンティティをリストで取得
    List<Category> categories = categoryRepository.findAllById(categoryIds);
//    存在しないカテゴリーIDがリクエストされた場合
    if (categories.size() != categoryIds.size()) {
        throw new IllegalArgumentException("存在しないカテゴリIDが含まれています。");
    }
//    レシピで結合した中間テーブルにセット
    recipe.setCategories(categories);

}

//レシピ編集機能(削除)
@Transactional
public void  recipeDelete (Long recipeId,Long userId) {
    Recipe recipe = recipeRepository.findByRecipeIdAndUserId(recipeId, userId)
            .orElseThrow(() -> new IllegalArgumentException("対象のレシピが存在しません。"));

//   中間テーブルから該当レシピを削除
    recipe.getCategories().clear();
    recipeRepository.delete(recipe);
}


}
