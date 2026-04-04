package io.github.tm.recipeApp.repository;

import io.github.tm.recipeApp.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    //全ユーザーのレシピ一覧（ページネーション対応）
    @EntityGraph(attributePaths = {"categories"})
    Page<Recipe> findAllByOrderByRegisteredAtDesc(Pageable pageable);

    //レシピ詳細,編集
    @Query("""
                select distinct r
                from Recipe r
                left join fetch r.categories
                where r.recipeId = :recipeId
                  and r.userId = :userId
            """)
    Optional<Recipe> findByRecipeIdAndUserId(
            @Param("recipeId") Long recipeId,
            @Param("userId") Long userId
    );
}
