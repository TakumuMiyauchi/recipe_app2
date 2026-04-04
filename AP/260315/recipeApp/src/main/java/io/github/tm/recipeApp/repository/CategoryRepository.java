package io.github.tm.recipeApp.repository;

import io.github.tm.recipeApp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
